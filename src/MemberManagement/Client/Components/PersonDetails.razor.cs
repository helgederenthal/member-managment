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
using MemberManagement.Client.Services;
using MemberManagement.Shared;

namespace MemberManagement.Client.Components
{
    public partial class PersonDetails
    {
        [Parameter]
        public int Id { get; set; }
        [Parameter]
        public bool ShowBackButton { get; set; } = false;

        [Inject]
        private AppSettings AppSettings { get; set; } = default!;
        [Inject]
        private IPersonDataService PersonDataService { get; set; } = default!;
        [Inject]
        private NavigationManager NavigationManager { get; set; } = default!;
        
        private bool Loading { get; set; } = true;

        public Person? Person { get; set; } = default!;

        protected override async Task OnInitializedAsync()
        {
            try
            {
                Person = await PersonDataService.GetPerson(Id);
            }
            catch
            {
                Console.WriteLine("Getting Person from API failed!");
            }
            Loading = false;
        }

        private void EditButtonClicked()
        {
            NavigationManager.NavigateTo("/person/" + Id + "/edit", false);
        }
    }
}