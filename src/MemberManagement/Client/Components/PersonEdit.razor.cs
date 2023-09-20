using global::Microsoft.AspNetCore.Components;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;

namespace MemberManagement.Client.Components
{
    public partial class PersonEdit
    {
        [Parameter]
        public int? Id { get; set; }

        [Inject]
        public IPersonDataService PersonDataService { get; set; } = default!;

        public Person Person { get; set; } = default!;
    }
}
