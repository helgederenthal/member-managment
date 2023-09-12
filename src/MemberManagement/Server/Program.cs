using MemberManagement.Client;
using MemberManagement.Server.Data;
using MemberManagement.Shared;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Core;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

// Get Connection String
var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");
if (connectionString != null)
{
    connectionString = Environment.ExpandEnvironmentVariables(connectionString);
}

// Add Services to the Container
builder.Services.AddDbContext<MemberManagementDbContext>(
    options => options.UseSqlite(
        connectionString,
        o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery))
    );
builder.Services.AddControllersWithViews().AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddRazorPages();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Client App Settings
var clientAppSettings = builder.Configuration.GetSection("ClientAppSettings").Get<ClientAppSettings>();
if (clientAppSettings != null)
{
    builder.Services.AddSingleton(clientAppSettings);
}

// Logging
builder.Host.UseSerilog((ctx, lc) =>
{
    lc.ReadFrom.Configuration(ctx.Configuration)
    .MinimumLevel.Override("Microsoft", new LoggingLevelSwitch(LogEventLevel.Warning))
    .MinimumLevel.Override("Microsoft.Hosting.Lifetime", new LoggingLevelSwitch(LogEventLevel.Warning));
});

var app = builder.Build();

// Get Database Context
var context = app.Services.CreateScope().ServiceProvider.GetRequiredService<MemberManagementDbContext>();

// Init Database
context.Database.EnsureCreated();
var demoDataSeeder = new DemoDataSeeder(context);
if (builder.Configuration.GetSection("DemoData").GetSection("ClearDatabase").Value == "true")
{
    demoDataSeeder.ClearDatabase();
}
if (builder.Configuration.GetSection("DemoData").GetSection("AddDemoData").Value == "true")
{
    demoDataSeeder.AddDemoData();
}

#region Logger

ILogger<App> logger = app.Services.GetRequiredService<ILogger<App>>();

app.Lifetime.ApplicationStarted.Register(() =>
{
    logger.LogInformation($"{new string('#', 15)} Application started {new string('#', 15)}");
    logger.LogInformation($"Urls: {string.Join(",", app.Urls)}");
    logger.LogInformation($"Environment: {app.Environment.EnvironmentName}");
    logger.LogInformation(new string('-', 51));
});

app.Lifetime.ApplicationStopping.Register(() =>
{
    logger.LogInformation($"{new string('#', 15)} Application stopped {new string('#', 15)}");
});

#endregion

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger(c =>
    {
        c.RouteTemplate = "api/swagger/{documentname}/swagger.json";
    });
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "MemberManagement API");
    c.RoutePrefix = "api/swagger";
});

//app.UseHttpsRedirection();

app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.UseRouting();

app.MapRazorPages();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
