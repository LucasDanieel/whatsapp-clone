using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Whatsapp.Domain.Authentication;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Infra.Data.Authentication
{
    public class TokenGenerator : ITokenGenerator
    {
        public dynamic Generator(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim("Email", user.Email),
                new Claim("Password", user.Password)
            };

            var expires = DateTime.Now.AddDays(1);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("Secret") ?? "TokenDaAplicaçãoSecreta"));

            var tokenDat = new JwtSecurityToken(
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                expires: expires,
                claims: claims
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenDat);
        }
    }
}
