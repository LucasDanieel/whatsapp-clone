using Microsoft.AspNetCore.Http;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.Service;

namespace Whatsapp.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<ResultService<UserDTO>> AuthUserByEmailAndPasswordAsync(UserAuthDTO userAuthDTO);
        Task<ResultService<UserDTO>> GetNewContactAsync(int contactId);
        Task<ResultService<string>> ValidateUserAsync(string email, string password);
        Task<ResultService<string>> CreateAsync(UserCreateDTO userCreateDTO);
        Task<ResultService> UpdateNameOrNoteAsync(UserNameAndNoteDTO userNameEndNoteDTO);
        Task<ResultService<string>> UpdateImageAsync(IFormFile file);
        Task<ResultService> DeleteAsync(int id);
    }
}
