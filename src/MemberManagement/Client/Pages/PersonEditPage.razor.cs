using global::System;
using global::System.Collections.Generic;
using global::System.Linq;
using global::System.Threading.Tasks;
using global::Microsoft.AspNetCore.Components;
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.Web.Virtualization;
using Microsoft.AspNetCore.Components.WebAssembly.Http;
using Microsoft.JSInterop;
using MemberManagement.Client;
using MemberManagement.Client.Shared;
using MemberManagement.Client.Components;
using MemberManagement.Client.Components.Icons;
using MemberManagement.Client.Services.Interfaces;

namespace MemberManagement.Client.Pages
{
    public partial class PersonEditPage
    {
        [Parameter]
        public int? Id { get; set; }
    }
}
