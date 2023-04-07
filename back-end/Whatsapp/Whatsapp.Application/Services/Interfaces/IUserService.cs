using Whatsapp.Application.DTOs;
using Whatsapp.Application.Service;

namespace Whatsapp.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<ResultService<UserDTO>> GetUserByEmailAndPasswordAsync(string email, string password);
        Task<ResultService<UserDTO>> GetUserByEmailAsync(string email);
        Task<ResultService<UserDTO>> CreateAsync(UserCreateDTO userCreateDTO);
        Task<ResultService> UpdateAsync(UserDTO userDTO);
        Task<ResultService> DeleteAsync(Guid id);
    }
}
