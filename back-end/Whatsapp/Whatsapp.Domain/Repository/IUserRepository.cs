using Whatsapp.Domain.Entities;

namespace Whatsapp.Domain.Repository
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(int id);
        Task<User> GetUserAsContatcByIdAsync(int contactId);
        Task<UserImage> GetUserImageByUserIdAsync(int id);
        Task<User> GetByEmailAndPasswordAsync(string email, string password);
        Task<User> ValidateAsync(string email, string password);
        Task<User> CreateAsync(User user);
        Task CreateUserImageAsync(UserImage userImage);
        Task UpdateAsync(User user);
        Task UpdateUserImageAsync(UserImage userImage);
        Task<DateTime> UpdateLastAccess(string email);
        Task DeleteAsync(User user);
    }
}
