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

        public static List<int> GetAnniversariesOfDateInTimespan(DateTime date, DateTime timespanStart, DateTime timespanEnd)
        {
            // If end is before start
            if (timespanEnd < timespanStart)
            {
                // Swap start and end
                (timespanStart, timespanEnd) = (timespanEnd, timespanStart);
            }

            List<int> anniversaries = new();

            // Init list of tuples for separate timespans
            List<Tuple<DateTime, DateTime>> timespans = new();

            // Divide timespan in parts for separate years
            while (timespanEnd.Year > timespanStart.Year)
            {
                DateTime subTimespanStart = timespanStart;
                DateTime subTimespanEnd = new(timespanStart.Year, 12, 31, 23, 59, 59);
                timespans.Add(new(subTimespanStart, subTimespanEnd));

                timespanStart = new(timespanStart.Year + 1, 1, 1);
            }
            timespans.Add(new(timespanStart, new(timespanEnd.Year, timespanEnd.Month, timespanEnd.Day, 23, 59, 59)));

            PrintTimespans(timespans);

            // For each timespan
            foreach (var timespan in timespans)
            {
                var year = timespan.Item1.Year;
                DateTime dateInYear = new(year, date.Month, date.Day);
                if (timespan.Item1 <= dateInYear && dateInYear <= timespan.Item2)
                {
                    anniversaries.Add(year - date.Year);
                }
            }

            return anniversaries;
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

            if (preserveOrigin)
            {
                var origin = GetQueryStringParameter("origin");
                if (origin != string.Empty)
                {
                    originPart = $"?origin={origin}";
                }
            }

            NavigationManager.NavigateTo(target + originPart, false);
        }

        private static void PrintTimespans(List<Tuple<DateTime, DateTime>> timespans)
        {
            foreach (var timespan in timespans)
            {
                Console.WriteLine($"{timespan.Item1} - {timespan.Item2}");
            }
        }
    }
}
