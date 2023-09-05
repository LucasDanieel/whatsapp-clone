using Whatsapp.Domain.Entities;

namespace Whatsapp.Domain.Repository
{
    public interface IMessageRepository
    {
        Task<ICollection<Message>> GetMessagesWithMyContactAsync(int myId, int contactId, DateTime lastDate);
        Task<Message> CreateMessageWithMyContactAsync(Message message);
        Task UpdateStatusMessageAsync(ICollection<Message> message);
    }
}
