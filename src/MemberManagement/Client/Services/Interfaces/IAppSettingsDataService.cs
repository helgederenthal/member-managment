using MemberManagement.Shared;

namespace MemberManagement.Client.Services.Interfaces;

public interface IAppSettingsDataService
{
    Task<ClientAppSettings?> GetClientAppSettings();
}
