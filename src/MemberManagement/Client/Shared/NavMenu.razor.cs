using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;

namespace MemberManagement.Client.Shared
{
    public partial class NavMenu
    {
        private bool collapseNavMenu = true;
        private string? NavMenuCssClass => collapseNavMenu ? "collapse" : null;

        [Inject]
        NavigationManager NavigationManager { get; set; } = default!;

        private string Title { get; set; } = "";

        protected override void OnInitialized()
        {
            if (NavigationManager != null)
            {
                Title = GetTitle(NavigationManager.Uri);
                NavigationManager.LocationChanged += HandleLocationChanged;
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

        private static string GetTitle(string location)
        {
            var title = AppSettings.Title;
            if (location.ToLower().EndsWith("members"))
            {
                title = "Members";
            }

            return title;
        }
    }
}
