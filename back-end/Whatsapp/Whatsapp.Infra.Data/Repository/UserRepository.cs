using Microsoft.EntityFrameworkCore;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Repository;
using Whatsapp.Infra.Data.ContextDb;

namespace Whatsapp.Infra.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User> GetUserAsContatcByIdAsync(int contactId)
        {
            return await _db.Users.Include(x => x.UserImage).Where(x => x.Id == contactId).Select(x => new User(x.Id, x.Name, x.Email, x.Note, x.LastAccess, new UserImage(x.UserImage.ImageUrl))).FirstOrDefaultAsync();
        }

        public async Task<UserImage> GetUserImageByUserIdAsync(int userId)
        {
            return await _db.UserImages.FirstOrDefaultAsync(x => x.UserId == userId);
        }

        public async Task<User> GetByEmailAndPasswordAsync(string email, string password)
        {
            return await _db.Users.Include(x => x.UserImage)
                .Where(x => x.Email == email && x.Password == password)
                .Select(x => new User(x.Id, x.Name, x.Email, x.Note, new UserImage(x.UserImage.ImageUrl)))
                .FirstOrDefaultAsync();
        }

        public async Task<User> ValidateAsync(string email, string password)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.Email == email && x.Password == password);
        }

        public async Task<User> CreateAsync(User user)
        {
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return user;
        }

        public async Task CreateUserImageAsync(UserImage userImage)
        {
            _db.UserImages.Add(userImage);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateUserImageAsync(UserImage userImage)
        {
            _db.UserImages.Update(userImage);
            await _db.SaveChangesAsync();
        }

        public async Task<DateTime> UpdateLastAccess(string email)
        {
            User user = await _db.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null) return DateTime.Now;
            user.UpdateLastAccess();

            _db.Users.Update(user);
            await _db.SaveChangesAsync();
            return (DateTime)user.LastAccess;
        }

        public async Task DeleteAsync(User user)
        {
            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
        }
    }
}
