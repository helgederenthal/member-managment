using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;
using Microsoft.AspNetCore.Components;

namespace MemberManagement.Client.Pages;

public partial class MemberList
{
    [Inject]
    public IPersonDataService PersonDataService{ get; set; } = default!;

    [Inject]
    public NavigationManager NavigationManager { get; set; } = default!;

    public List<Person>? Members { get; set; } = default!;

    protected override async Task OnInitializedAsync()
    {
        Members = (await PersonDataService.GetMembers()).ToList();
    }

    private void PersonClicked(int id)
    {
        NavigationManager.NavigateTo("/person/" + id, false);
    }
}
