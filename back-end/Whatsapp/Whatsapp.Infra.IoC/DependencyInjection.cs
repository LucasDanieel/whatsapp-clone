using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Whatsapp.Application.Mappings;
using Whatsapp.Application.Services;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Authentication;
using Whatsapp.Domain.Integrations;
using Whatsapp.Domain.Repository;
using Whatsapp.Infra.Data.Authentication;
using Whatsapp.Infra.Data.ContextDb;
using Whatsapp.Infra.Data.Integrations;
using Whatsapp.Infra.Data.Repository;

namespace Whatsapp.Infra.IoC
{
    public static class DependencyInjection
    {

        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(
                opt =>opt.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IContactBondRepository, ContactBondRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<ISaveImageInCloudinary, SaveImageInCloudinary>();
            services.AddScoped<ITokenGenerator, TokenGenerator>();

            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(DomainToDtoMapping));
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IMessageService, MessageService>();

            return services;
        }
    }
}
