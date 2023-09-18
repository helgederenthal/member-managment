using System.Globalization;
using System.Net.Http.Json;
using MemberManagement.Shared;

namespace MemberManagement.Client.Services;

public class AppSettings
{
    private ClientAppSettings appSettings = default!;
    private readonly HttpClient httpClient;

    #region Properties

    public string Title { get => appSettings.Title; }

    public CultureInfo CultureInfo
    {
        get {
            CultureInfo cultureInfo;
            if (appSettings.CultureInfo != string.Empty)
            {
                cultureInfo = new CultureInfo(appSettings.CultureInfo);
            }
            else
            {
                cultureInfo = CultureInfo.CurrentCulture;
            }

            return cultureInfo;
        }
    }

    public int CacheExpiration { get => appSettings.CacheExpiration; }

    #endregion

    public AppSettings(HttpClient _httpClient)
    {
        httpClient = _httpClient;

    }

    public async Task Init()
    {
        if(appSettings == null)
        {
            var clientAppSettings = await httpClient.GetFromJsonAsync<ClientAppSettings>("api/ClientAppSettings");

            if(clientAppSettings != null)
            {
                appSettings = clientAppSettings;

                
            }
        }
    }
}
