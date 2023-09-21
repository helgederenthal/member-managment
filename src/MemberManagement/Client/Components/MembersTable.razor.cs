using Microsoft.AspNetCore.Components;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;
using MemberManagement.Client.Shared;

namespace MemberManagement.Client.Components
{
    public partial class MembersTable
    {
        [Inject]
        private IPersonDataService PersonDataService { get; set; } = default!;
        [Inject]
        private Utilities Utilities { get; set; } = default!;

        public List<Person>? Members { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            Members = (await PersonDataService.GetMembers())?.ToList();
        }

        private void PersonClicked(int id)
        {
            Utilities.NavigateTo("/person/" + id + "?origin=members");
        }
    }
}
