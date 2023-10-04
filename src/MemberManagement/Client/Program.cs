using MemberManagement.Client;
using MemberManagement.Client.Services;
using MemberManagement.Client.Services.Interfaces;
using MemberManagement.Client.Shared;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Http Client
var httpClient = new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) };
builder.Services.AddSingleton(httpClient);

// Utilities
builder.Services.AddSingleton<Utilities>();

// App Settings
AppSettings appSettings = new AppSettings(httpClient);
await appSettings.Init();
builder.Services.AddSingleton(appSettings);

// Data Services
builder.Services.AddSingleton<IPersonDataService, PersonDataService>();

// Authentication
builder.Services.AddOidcAuthentication(options =>
{
    builder.Configuration.Bind("Auth0", options.ProviderOptions);
    options.ProviderOptions.ResponseType = "code";
});

await builder.Build().RunAsync();
