using Microsoft.AspNetCore.Authorization;
using Whatsapp.Domain.Authentication;

namespace Whatsapp.Api.Authentication
{
    public class CurrentUser : ICurrentUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsValid { get; set; }

        public CurrentUser(IHttpContextAccessor httpContext)
        {
            var claims = httpContext?.HttpContext?.User?.Claims;

            if (claims.Any(x => x.Type == "Email"))
            {
                Email = claims.First(x => x.Type == "Email").Value;
            }

            if (claims.Any(x => x.Type == "Password"))
            {
                Password = claims.First(x => x.Type == "Password").Value;
            }

            if (claims.Any(x => x.Type == "exp"))
            {
                var time = long.Parse(claims.First(x => x.Type == "exp").Value);
                DateTimeOffset dt = DateTimeOffset.FromUnixTimeSeconds(time);
                IsValid = dt.DateTime > DateTime.Now;
            }
        }
    }
}
