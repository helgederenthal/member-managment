using System.Net.Http.Json;
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

    private async Task EnsureCacheValid()
    {
        Console.WriteLine(DateTime.Now);
        if (Persons == null || DateTime.Now > PersonsExpiration)
        {
            Persons = await _httpClient.GetFromJsonAsync<List<Person>>("api/Person");
            PersonsExpiration = DateTime.Now.AddSeconds(_appSettings.CacheExpiration);
        }        
    }
}
