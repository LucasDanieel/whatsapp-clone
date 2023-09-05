namespace Whatsapp.Application.DTOs
{
    public class NewContactDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Note { get; set; }
        public string? ImageUrl { get; set; }
    }
}
