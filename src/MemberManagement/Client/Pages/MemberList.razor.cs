using System.Net.Http.Json;
using MemberManagement.Shared;
using Microsoft.AspNetCore.Components;

namespace MemberManagement.Client.Pages
{
    public partial class MemberList
    {
        [Inject]
        public HttpClient HttpClient { get; set; } = default!;

        [Inject]
        public NavigationManager NavigationManager { get; set; } = default!;

        public List<Person>? Persons { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            Persons = await HttpClient.GetFromJsonAsync<List<Person>>("api/Person");
        }

        private void PersonClicked(int id)
        {
            NavigationManager.NavigateTo("/person/" + id, false);
        }
    }
}
