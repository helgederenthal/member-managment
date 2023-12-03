using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Client.Shared;
using MemberManagement.Shared;
using Microsoft.AspNetCore.Components;

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

            List<int> birthdayYearsToHonor = new List<int>() { 50, 60, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120 };

            if (members != null)
            {
                foreach (Person person in members)
                {
                }
            }

            return birthdayHonors;
        }
    }
}
