using Microsoft.AspNetCore.Components;

namespace MemberManagement.Client.Pages
{
    public partial class PersonDetailsPage
    {
        [Parameter]
        public int Id { get; set; }
    }
}
