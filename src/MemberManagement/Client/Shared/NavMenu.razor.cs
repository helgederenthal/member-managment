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

        private string _Title = "";
        private string TabTitle { get; set; } = "";
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
