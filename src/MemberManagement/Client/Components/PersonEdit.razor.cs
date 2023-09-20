using Microsoft.AspNetCore.Components;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;

namespace MemberManagement.Client.Components
{
    public partial class PersonEdit
    {
        [Parameter]
        public int? Id { get; set; } = default!;

        [Inject]
        public IPersonDataService PersonDataService { get; set; } = default!;

        public Person? Person { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            if(Id != null)
            {
                Person = await PersonDataService.GetPerson((int)Id);
            }
            else
            {
                Person = new Person { LastName = "", FirstName = "" };
            }
        }
    }
}
