using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Whatsapp.Application.DTOs;
using Whatsapp.Domain.Authentication;

namespace Whatsapp.Api.Controllers
{
    [ApiController]
    [Route("base-controller")]
    public class BaseController : ControllerBase
    {
        [NonAction]
        public UserAuthDTO Validator(ICurrentUser currentUser)
        {
            if (currentUser == null || string.IsNullOrEmpty(currentUser.Email) || string.IsNullOrEmpty(currentUser.Password) || !currentUser.IsValid)
                return null;

            return new UserAuthDTO { Email = currentUser.Email, Password = currentUser.Password };
        }

        [NonAction]
        public IActionResult Forbidden()
        {
            var obj = new
            {
                code = "acesso_negado",
                message = "Usuario não contem as devidas informações necessarias para o acesso"
            };

            return new ObjectResult(obj) { StatusCode = 403 };
        }
    }
}
