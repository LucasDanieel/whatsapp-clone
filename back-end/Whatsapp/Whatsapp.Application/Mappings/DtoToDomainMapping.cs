using AutoMapper;
using Whatsapp.Application.DTOs;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Application.Mappings
{
    public class DtoToDomainMapping : Profile
    {
        public DtoToDomainMapping()
        {
            CreateMap<UserDTO, User>();
            CreateMap<UserCreateDTO, User>();
        }
    }
}
