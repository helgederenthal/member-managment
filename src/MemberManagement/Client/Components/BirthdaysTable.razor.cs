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

        public List<Tuple<Person, List<int>>>? Members { get; set; } = default!;

        public List<int>? Anniversaries { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            var AllMembers = (await PersonDataService.GetMembers())?.ToList();
            Members = FilterMembers(AllMembers);
        }

        private void PersonClicked(int id)
        {
            Utilities.NavigateTo("/person/" + id + "?origin=birthdays");
        }

        private static List<Tuple<Person, List<int>>> FilterMembers(List<Person>? members)
        {
            DateTime timespanStart = new(2024, 1, 1);
            DateTime timespanEnd = new(2024, 12, 31);

            List<Tuple<Person, List<int>>> birthdayHonors = new();

            List<int> birthdayYearsToHonor = new() { 50, 60, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120 };

            if (members != null)
            {
                foreach (Person person in members)
                {
                    if (person.BornOn != null)
                    {
                        List<int> honoredAnniversaries = new();
                        var anniversaries = Utilities.GetAnniversariesOfDateInTimespan((DateTime)person.BornOn, timespanStart, timespanEnd);

                        foreach (var anniversary in anniversaries)
                        {
                            if (birthdayYearsToHonor.Contains(anniversary))
                            {
                                honoredAnniversaries.Add(anniversary);
                            }
                        }

                        if (honoredAnniversaries.Count > 0)
                        {
                            birthdayHonors.Add(new(person, honoredAnniversaries));
                        }
                    }
                }
            }

            var sortedList = birthdayHonors.OrderBy(x => x.Item1.BornOn.Value.Month).ThenBy(x => x.Item1.BornOn.Value.Day).ToList();

            return sortedList;
        }
    }
}
