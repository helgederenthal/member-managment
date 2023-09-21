using Microsoft.AspNetCore.Components;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Client.Services;
using MemberManagement.Shared;
using MemberManagement.Client.Shared;

namespace MemberManagement.Client.Components
{
    public partial class PersonDetails
    {
        [Parameter]
        public int Id { get; set; }
        [Parameter]
        public bool ShowBackButton { get; set; } = false;

        [Inject]
        private AppSettings AppSettings { get; set; } = default!;
        [Inject]
        private IPersonDataService PersonDataService { get; set; } = default!;
        [Inject]
        private Utilities Utilities { get; set; } = default!;

        private bool Loading { get; set; } = true;

        public Person? Person { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            try
            {
                Person = await PersonDataService.GetPerson(Id);
            }
            catch
            {
                Console.WriteLine("Getting Person from API failed!");
            }
            Loading = false;
        }

        private void EditButtonClicked()
        {
            Utilities.NavigateTo("/person/" + Id + "/edit");
        }

        private static int GetAnniversary(DateTime? startDate, DateTime anniversaryAt)
        {
            if(startDate != null)
            {
                // Calculate the age.
                var age = anniversaryAt.Year - ((DateTime)startDate).Year;

                // Go back to the year in which the person was born in case of a leap year
                if (((DateTime)startDate).Date > anniversaryAt.AddYears(-age)) age--;

                return age;
            }

            return 0;
            
        }
    }
}