using MemberManagement.Client.Services;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;
using Microsoft.AspNetCore.Components;

namespace MemberManagement.Client.Pages;

public partial class PersonDetails
{
    [Inject]
    public AppSettings AppSettings { get; set; } = default!;
    [Inject]
    public IPersonDataService PersonDataService { get; set; } = default!;

    [Parameter]
    public int Id { get; set; }

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
}
