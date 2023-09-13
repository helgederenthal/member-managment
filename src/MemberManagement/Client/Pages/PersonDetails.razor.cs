using System.Net.Http.Json;
using MemberManagement.Shared;
using Microsoft.AspNetCore.Components;

namespace MemberManagement.Client.Pages
{
    public partial class PersonDetails
    {
        [Inject]
        public HttpClient HttpClient { get; set; } = default!;

        [Parameter]
        public int Id { get; set; }

        private bool Loading { get; set; } = true;

        public Person? Person { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            try
            {
                Person = await HttpClient.GetFromJsonAsync<Person>($"api/Person/{Id}");
            }
            catch
            {
                Console.WriteLine("Getting Person from API failed!");
            }
            Loading = false;
        }
    }
}