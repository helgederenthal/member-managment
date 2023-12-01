using Microsoft.AspNetCore.Components;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;
using MemberManagement.Client.Shared;

namespace MemberManagement.Client.Components
{
    public partial class BirthdaysTable
    {
        [Inject]
        private IPersonDataService PersonDataService { get; set; } = default!;
        [Inject]
        private Utilities Utilities { get; set; } = default!;

        public List<Person>? Members { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            var AllMembers = (await PersonDataService.GetMembers())?.ToList();
            Members = FilterMembers(AllMembers); 
        }

        private void PersonClicked(int id)
        {
            Utilities.NavigateTo("/person/" + id + "?origin=birthdays");
        }

        private static List<Person> FilterMembers(List<Person>? members)
        {
            List<Person> birthdayHonors = new();
            return birthdayHonors;
        }
    }
}
