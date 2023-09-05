using Microsoft.AspNetCore.Http;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Domain.Integrations
{
    public interface ISaveImageInCloudinary
    {
        Task<string> SaveImagemCloudinary(User user, IFormFile file);
        Task<Message> SaveImagemFromChatCloudinary(IFormFile file, Message message);
    }
}
