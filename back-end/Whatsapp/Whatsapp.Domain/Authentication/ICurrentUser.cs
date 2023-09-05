namespace Whatsapp.Domain.Authentication
{
    public interface ICurrentUser
    {
        public string Email { get; }
        public string Password { get; }
        public bool IsValid { get; }
    }
}
