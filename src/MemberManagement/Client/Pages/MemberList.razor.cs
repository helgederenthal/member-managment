using System.Net.Http.Json;
using MemberManagement.Shared;

namespace MemberManagement.Client.Pages
{
    public partial class MemberList
    {
        public List<Person>? Persons { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            Persons = await Http.GetFromJsonAsync<List<Person>>("api/Person");
        }
    }
}
