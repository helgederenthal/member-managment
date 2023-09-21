using Microsoft.AspNetCore.Components;
using System.Web;

namespace MemberManagement.Client.Shared
{
    public class Utilities
    {
        private NavigationManager NavigationManager { get; set; } = default!;

        public Utilities(NavigationManager navigationManager)
        {
            NavigationManager = navigationManager;
        }

        public string GetQueryStringParameter(string parameterName)
        {
            var queryVariables = HttpUtility.ParseQueryString(new Uri(NavigationManager.Uri).Query);
            if (queryVariables.AllKeys.Contains(parameterName))
            {
                var origin = queryVariables[parameterName] ?? string.Empty;
                return origin;
            }
            else
            {
                return string.Empty;
            }
        }

        public void NavigateTo(string target, bool preserveOrigin = true)
        {
            
            var originPart = "";

            if(preserveOrigin)
            {
                var origin = GetQueryStringParameter("origin");
                if (origin != string.Empty)
                {
                    originPart = $"?origin={origin}";
                }
            }            

            NavigationManager.NavigateTo(target + originPart, false);
        }
    }
}
