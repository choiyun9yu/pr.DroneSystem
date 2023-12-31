global using System;
global using System.Net;
global using System.Net.Sockets;
global using Microsoft.AspNetCore.Mvc;
global using System.Threading.Tasks;
global using System.Linq;
global using System.Collections.Generic;
global using DotNetty.Buffers;
global using DotNetty.Codecs;
global using DotNetty.Common.Utilities;
global using DotNetty.Transport.Bootstrapping;
global using DotNetty.Transport.Channels;
global using DotNetty.Transport.Channels.Sockets;
global using Microsoft.AspNetCore.SignalR;
global using Newtonsoft.Json;
using Microsoft.AspNetCore.SignalR.Protocol;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

using kisa_gcs_system.Interfaces;
using kisa_gcs_system.Services;

namespace kisa_gcs_system;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();  
        services.AddCors(options => 
        {
            options.AddPolicy("CorsPolicy", builder =>
            {
                builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
                    .AllowAnyMethod()   
                    .AllowAnyHeader()   
                    .AllowCredentials();
            });
        });
        services.AddSingleton<MavlinkHandler>();
        services.AddSingleton<DroneController>();
        services.AddSingleton<MavlinkNetty>();

        services.AddSignalR();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {  
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }
        app.UseRouting();              
        app.UseAuthorization();        
        app.UseCors("CorsPolicy");      
        app.UseEndpoints(endpoints => 
        {
            endpoints.MapControllers();
            endpoints.MapHub<DroneController>("/droneHub");
            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        });
    }
    
    public static TBuilder AddNewtonsoftJsonProtocol<TBuilder>(TBuilder builder, Action<NewtonsoftJsonHubProtocolOptions> configure) where TBuilder : ISignalRBuilder
    {
        builder.Services.TryAddEnumerable(ServiceDescriptor.Singleton<IHubProtocol, NewtonsoftJsonHubProtocol>());
        builder.Services.Configure(configure);
        return builder;
    }
}