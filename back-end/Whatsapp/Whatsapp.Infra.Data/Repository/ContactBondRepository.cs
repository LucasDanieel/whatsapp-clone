using Microsoft.EntityFrameworkCore;
using System.Linq;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Repository;
using Whatsapp.Infra.Data.ContextDb;

namespace Whatsapp.Infra.Data.Repository
{
    public class ContactBondRepository : IContactBondRepository
    {
        private readonly ApplicationDbContext _db;

        public ContactBondRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<ICollection<User>> GetAllMyContactsAsync(int myId)
        {
            var bond = _db.ContactBonds
                .Where(x => x.UserIdSent == myId || x.UserIdReceived == myId)
                .AsQueryable();

            var contacts = await _db.Users
                .Include(x => x.UserImage)
                .Where(x => bond.Any(u => u.UserIdReceived == x.Id || u.UserIdSent == x.Id) && x.Id != myId)
                .Select(x => new User(x.Id, x.Name, x.Email, x.Note, x.LastAccess, new UserImage(x.UserImage.ImageUrl), _db.Messages.Include(m => m.RespondedMessage).OrderByDescending(u => u.DateTime).FirstOrDefault(m => m.UserIdSent == myId && m.UserIdReceived == x.Id || m.UserIdSent == x.Id && m.UserIdReceived == myId), _db.Messages.Where(x => x.UserIdReceived == myId).Count(x => x.MessageStatus == 2)))
                .ToListAsync();

            return contacts;

        }

        public async Task<ICollection<User>> GetByEmailAsync(string email, int id)
        {
            var result = await _db.Users
                .Include(x => x.UserImage)
                .Where(x => x.Email.Contains(email) && x.Id != id)
                .Where(x => !_db.ContactBonds
                .Any(cb => (cb.UserIdSent == x.Id && cb.UserIdReceived == id) || (cb.UserIdSent == id && cb.UserIdReceived == x.Id)))
                .Select(x => new User(x.Id, x.Name, x.Email, x.Note, x.LastAccess, new UserImage(x.UserImage.ImageUrl)))
                .ToListAsync();

            return result;
        }

        public async Task<ContactBond> GetBondAsync(int myId, int contactId)
        {
            return await _db.ContactBonds.FirstOrDefaultAsync(x => x.UserIdSent == myId && x.UserIdReceived == contactId ||
                        x.UserIdReceived == myId && x.UserIdSent == contactId);
        }

        public async Task<bool> CreateContactBondAsync(ContactBond contactBond)
        {
            User user = await _db.Users.FirstOrDefaultAsync(x => x.Id == contactBond.UserIdReceived);

            if (user == null) return false;

            _db.ContactBonds.Add(contactBond);
            await _db.SaveChangesAsync();

            return true;
        }
    }
}
