using AutoMapper;
using Whatsapp.Application.DTOs;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Application.Mappings
{
    public class DomainToDtoMapping : Profile
    {
        public DomainToDtoMapping()
        {
            CreateMap<User, UserDTO>();
            CreateMap<User, UserCreateDTO>();
        }
    }
}
