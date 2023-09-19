using Microsoft.AspNetCore.Components;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;

namespace MemberManagement.Client.Components
{
    public partial class MembersTable
    {
        [Inject]
        private IPersonDataService PersonDataService { get; set; } = default!;

        [Inject]
        private NavigationManager NavigationManager { get; set; } = default!;

        public List<Person>? Members { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            Members = (await PersonDataService.GetMembers())?.ToList();
        }

        private void PersonClicked(int id)
        {
            NavigationManager.NavigateTo("/person/" + id, false);
        }
    }
}
