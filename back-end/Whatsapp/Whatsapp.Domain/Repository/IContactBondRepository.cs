using Whatsapp.Domain.Entities;

namespace Whatsapp.Domain.Repository
{
    public interface IContactBondRepository
    {
        Task<ICollection<User>> GetAllMyContactsAsync(int myId);
        Task<ICollection<User>> GetByEmailAsync(string email, int id);
        Task<ContactBond> GetBondAsync(int myId, int contactId);
        Task<bool> CreateContactBondAsync(ContactBond contactBond);
    }
}
