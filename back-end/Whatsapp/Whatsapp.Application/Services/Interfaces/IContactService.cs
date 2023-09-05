using Whatsapp.Application.DTOs;
using Whatsapp.Application.Service;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Application.Services.Interfaces
{
    public interface IContactService
    {
        Task<ResultService<ICollection<ContactInfoDTO>>> GetAllMyContactsAsync(int myId);
        Task<ResultService<ICollection<UserDTO>>> GetNewContactByEmailAsync(string email, int id);
        Task<ResultService> CreateContactBondAsync(ContactBondDTO contactBondDTO);
    }
}
