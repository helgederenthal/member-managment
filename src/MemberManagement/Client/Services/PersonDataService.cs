using System.Net.Http.Json;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;

namespace MemberManagement.Client.Services;

public class PersonDataService : IPersonDataService
{
    private readonly HttpClient _httpClient;

    public PersonDataService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public Task<IEnumerable<Person>> GetAdditionalPersons()
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Person>> GetAllPersons()
    {
        List<Person> allPersons = new List<Person>();

        List<Person>? persons = await _httpClient.GetFromJsonAsync<List<Person>>("api/Person");
        if (persons != null)
        {
            persons = persons.OrderBy((p) => $"{p.LastName}{p.FirstName}").ToList();
            allPersons = persons;
        }

        return allPersons;
    }

    public async Task<IEnumerable<Person>> GetMembers()
    {
        // ToDo: Do IsMember Calculation when Mandates Stuff is available
        return await GetAllPersons();
    }

    public async Task<Person?> GetPerson(int id)
    {
        return await _httpClient.GetFromJsonAsync<Person>($"api/Person/{id}");
    }
}
