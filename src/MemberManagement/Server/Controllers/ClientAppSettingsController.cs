using Microsoft.AspNetCore.Mvc;
using MemberManagement.Shared;

namespace MemberManagement.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ClientAppSettingsController : ControllerBase
    {
        private readonly ClientAppSettings _clientAppSettings;

        public ClientAppSettingsController(ClientAppSettings clientAppSettings)
        {
            _clientAppSettings = clientAppSettings;
        }

        [HttpGet]
        public ClientAppSettings GetClientAppSettings()
        {
            return _clientAppSettings;
        }
    }
}