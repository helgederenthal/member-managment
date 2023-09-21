using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;

namespace MemberManagement.Client.Services;

public class PersonDataService : IPersonDataService
{
    private readonly AppSettings _appSettings;
    private readonly HttpClient _httpClient;
    private List<Person>? Persons { get; set; } = default;
    private DateTime PersonsExpiration { get; set; }

    public PersonDataService(AppSettings appSettings, HttpClient httpClient)
    {
        _appSettings = appSettings;
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<Person>?> GetAdditionalPersons()
    {
        await EnsureCacheValid();
        return await GetAllPersons();
    }

    public async Task<IEnumerable<Person>?> GetAllPersons()
    {
        await EnsureCacheValid();
        return Persons?.OrderBy((p) => $"{p.LastName}{p.FirstName}").ToList();
    }

    public async Task<IEnumerable<Person>?> GetMembers()
    {
        await EnsureCacheValid();
        // ToDo: Do IsMember Calculation when Mandates Stuff is available
        return await GetAllPersons();
    }

    public async Task<Person?> GetPerson(int id)
    {
        await EnsureCacheValid();
        return Persons?.FirstOrDefault(p => p.PersonId == id);
    }

    public async Task UpdatePerson(Person person)
    {
        // Write to api
        var personJson = new StringContent(JsonSerializer.Serialize(person), Encoding.UTF8, "application/json");
        await _httpClient.PutAsync($"api/Person/{person.PersonId}", personJson);

        // Write to cache
        var oldPerson = await GetPerson(person.PersonId);
        oldPerson?.Copy(person);
    }

    private async Task EnsureCacheValid()
    {
        if (Persons == null || DateTime.Now > PersonsExpiration)
        {
            Persons = await _httpClient.GetFromJsonAsync<List<Person>>("api/Person");
            PersonsExpiration = DateTime.Now.AddSeconds(_appSettings.CacheExpiration);
        }        
    }
}
