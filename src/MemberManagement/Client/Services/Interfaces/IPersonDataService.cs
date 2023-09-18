using MemberManagement.Shared;

namespace MemberManagement.Client.Services.Interfaces;

public interface IPersonDataService
{
    Task<IEnumerable<Person>?> GetAllPersons();
    Task<IEnumerable<Person>?> GetMembers();
    Task<IEnumerable<Person>?> GetAdditionalPersons();
    Task<Person?> GetPerson(int id);
}
