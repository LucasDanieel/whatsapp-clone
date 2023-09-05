using Microsoft.AspNetCore.Http;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.Service;

namespace Whatsapp.Application.Services.Interfaces
{
    public interface IMessageService
    {
        Task<ResultService<ICollection<MessageDTO>>> GetMessagesWithMyContactAsync(int myId, int contactId, DateTime dateTime);
        Task<ResultService<MessageDTO>> CreateMessageWithMyContactAsync(MessageDTO messageDTO);
        Task<ResultService<MessageDTO>> CreateMessageWithImageAsync(IFormFile file, MessageDTO messageDTO);
        Task<ResultService> UpdateMessagesAsync(ICollection<MessageDTO> messageDTO);
    }
}
