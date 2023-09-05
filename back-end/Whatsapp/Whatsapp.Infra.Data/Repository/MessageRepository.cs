using Microsoft.EntityFrameworkCore;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Repository;
using Whatsapp.Infra.Data.ContextDb;

namespace Whatsapp.Infra.Data.Repository
{
    public class MessageRepository : IMessageRepository
    {
        private readonly ApplicationDbContext _db;

        public MessageRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<ICollection<Message>> GetMessagesWithMyContactAsync(int myId, int contactId, DateTime lastDate)
        {
            var result =  await _db.Messages
                .Include(x => x.RespondedMessage)
                .Where(x => x.UserIdSent == myId && x.UserIdReceived == contactId || x.UserIdSent == contactId && x.UserIdReceived == myId)
                .Where(x => x.DateTime < lastDate)
                .OrderByDescending(x => x.DateTime)
                .Take(30)
                .ToListAsync();

            return result;
        }

        public async Task<Message> CreateMessageWithMyContactAsync(Message message)
        {
            message.Nulll();

            _db.Messages.Add(message);
            await _db.SaveChangesAsync();
            return message;
        }

        public async Task UpdateStatusMessageAsync(ICollection<Message> message)
        {
            foreach (var item in message)
            {
                item.Nulll();
            }

            if (message.Count == 1)
                _db.Messages.Update(message.FirstOrDefault());
            else
                _db.Messages.UpdateRange(message);

            await _db.SaveChangesAsync();
        }

    }
}
