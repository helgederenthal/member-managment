using System.Globalization;
using System.Net.Http.Json;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Shared;

namespace MemberManagement.Client.Services;

public class AppSettingsDataService : IAppSettingsDataService
{
    private readonly HttpClient httpClient;

    private ClientAppSettings? clientAppSettings = null;

    public AppSettingsDataService(HttpClient _httpClient)
    {
        httpClient = _httpClient;
    }

    public async Task<ClientAppSettings> GetClientAppSettings()
    {
        if(clientAppSettings == null)
        {
            clientAppSettings = await httpClient.GetFromJsonAsync<ClientAppSettings>("api/ClientAppSettings");

            clientAppSettings ??= new ClientAppSettings();

            if (clientAppSettings.CultureInfo == string.Empty)
            {
                clientAppSettings.CultureInfoObject = CultureInfo.CurrentCulture;
            }
            else
            {
                clientAppSettings.CultureInfoObject = new CultureInfo(clientAppSettings.CultureInfo);
            }
        }

        return clientAppSettings;
    }
}
