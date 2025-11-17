using CleanDiabeteApp.Application.Abstractions.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CleanDiabeteApp.Infrastructure.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config, bool useInMemory = false)
    {
        if (useInMemory)
        {
            services.AddDbContext<ApplicationDbContext>(o => o.UseInMemoryDatabase("CleanDiabeteAppDb"));
        }
        else
        {
            var conn = config.GetConnectionString("Default") ?? "Data Source=clean.db";
            services.AddDbContext<ApplicationDbContext>(o => o.UseSqlite(conn));
        }

        services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());
        return services;
    }
}
