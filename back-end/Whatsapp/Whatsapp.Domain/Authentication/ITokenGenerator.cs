using Whatsapp.Domain.Entities;

namespace Whatsapp.Domain.Authentication
{
    public interface ITokenGenerator
    {
        dynamic Generator(User user);
    }
}
