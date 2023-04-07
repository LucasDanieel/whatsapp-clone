using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Whatsapp.Application.Mappings;
using Whatsapp.Application.Services;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Repository;
using Whatsapp.Infra.Data.ContextDb;
using Whatsapp.Infra.Data.Repository;

namespace Whatsapp.Infra.IoC
{
    public static class DependencyInjection
    {

        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(
                opt => opt.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(DomainToDtoMapping));
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
