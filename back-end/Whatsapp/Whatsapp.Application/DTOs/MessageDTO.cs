using Whatsapp.Domain.Entities;

namespace Whatsapp.Application.DTOs
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public int UserIdSent { get; set; }
        public int UserIdReceived { get; set; }
        public string? DateTime { get; set; }
        public int MessageStatus { get; set; }
        public string? ImageUrl { get; set; }
        public string? PublicId { get; set; }
        public int? RespondedMessageId { get; set; }
        public MessageDTO? RespondedMessage { get; set; }
    }
}
