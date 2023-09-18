using MemberManagement.Client.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using System.Text.RegularExpressions;

namespace MemberManagement.Client.Shared;

public partial class NavMenu
{
    private bool collapseNavMenu = true;
    private string? NavMenuCssClass => collapseNavMenu ? "collapse" : null;

    [Inject]
    NavigationManager NavigationManager { get; set; } = default!;

    [Inject]
    AppSettings AppSettings { get; set; } = default!;

    private string TabTitle { get; set; } = "";

    private string _Title = "";
    public string Title
    {
        get { return _Title; }
        set
        {
            _Title = value;
            if (_Title == AppSettings.Title)
            {
                TabTitle = _Title;
            }
            else
            {
                TabTitle = _Title + " - " + AppSettings.Title;
            }
        }
    }

    protected override void OnInitialized()
    {
        if (NavigationManager != null)
        {
            NavigationManager.LocationChanged += HandleLocationChanged;
            Title = GetTitle(NavigationManager.Uri);
            StateHasChanged();
        }
    }

    private void HandleLocationChanged(object? sender, LocationChangedEventArgs e)
    {
        Title = GetTitle(e.Location);
        StateHasChanged();
    }

    private void ToggleNavMenu()
    {
        collapseNavMenu = !collapseNavMenu;
    }

    private string GetTitle(string location)
    {
        var title = AppSettings.Title;
        if (location.ToLower().EndsWith("/members"))
        {
            title = "Members";
        }
        if (Regex.Match(location, ".*\\/person\\/\\d+$").Success)
        {
            title = "Person Details";
        }
        if (location.ToLower().EndsWith("/birthdays"))
        {
            title = "Birthdays";
        }
        if (location.ToLower().EndsWith("/honors"))
        {
            title = "Honors";
        }
        if (location.ToLower().EndsWith("/honorarymembers"))
        {
            title = "Honorary Members";
        }
        if (location.ToLower().EndsWith("/otherpeople"))
        {
            title = "Other People";
        }

        return title;
    }
}
