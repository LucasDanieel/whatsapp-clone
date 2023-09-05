using Whatsapp.Domain.Entities;

namespace Whatsapp.Application.DTOs
{
    public class ContactInfoDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Note { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime? LastAccess { get; set; }
        public Message? LastMessage { get; set; }
        public int CountMessage { get; set; }
    }
}
