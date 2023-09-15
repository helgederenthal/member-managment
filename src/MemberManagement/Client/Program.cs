using MemberManagement.Client;
using MemberManagement.Client.Services;
using MemberManagement.Client.Services.Interfaces;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Http Client
builder.Services.AddSingleton(new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Data Services
builder.Services.AddSingleton<IAppSettingsDataService, AppSettingsDataService>();
builder.Services.AddSingleton<IPersonDataService, PersonDataService>();

await builder.Build().RunAsync();
