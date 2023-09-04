using MemberManagement.Client;
using Serilog;
using Serilog.Core;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Host.UseSerilog((ctx, lc) =>
{
    lc.ReadFrom.Configuration(ctx.Configuration)
    .MinimumLevel.Override("Microsoft", new LoggingLevelSwitch(LogEventLevel.Warning))
    .MinimumLevel.Override("Microsoft.Hosting.Lifetime", new LoggingLevelSwitch(LogEventLevel.Warning));
});

var app = builder.Build();

ILogger<App> logger = app.Services.GetRequiredService<ILogger<App>>();

app.Lifetime.ApplicationStarted.Register(() =>
{
    logger.LogInformation($"{new string('#',15)} Application started {new string('#', 15)}");
    logger.LogInformation($"Urls: {string.Join(",", app.Urls)}");
    logger.LogInformation($"Environment: {app.Environment.EnvironmentName}");
    logger.LogInformation(new string('-', 51));
});

app.Lifetime.ApplicationStopping.Register(() =>
{
    logger.LogInformation($"{new string('#', 15)} Application stopped {new string('#', 15)}");
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.UseRouting();

app.MapRazorPages();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
