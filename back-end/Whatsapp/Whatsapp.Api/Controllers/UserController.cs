using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Authentication;

namespace Whatsapp.Api.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly ICurrentUser _currentUser;

        public UserController(IUserService userService, ICurrentUser currentUser)
        {
            _userService = userService;
            _currentUser = currentUser;
        }

        [HttpGet]
        [Authorize]
        [Route("auth")]
        public async Task<IActionResult> AuthUserAsync()
        {
            var userAuth = Validator(_currentUser);
            if (userAuth == null)
                return Forbidden();

            var result = await _userService.AuthUserByEmailAndPasswordAsync(userAuth);

            if (result.IsSuccess)
                return Ok(result);

            return Forbidden();
        }

        [HttpGet]
        [Route("login/{email}/{password}")]
        public async Task<ActionResult> LoginUserAsync(string email, string password)
        {
            var result = await _userService.ValidateUserAsync(email, password);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult> CreateUserAsync([FromBody] UserCreateDTO userCreateDTO)
        {
            var result = await _userService.CreateAsync(userCreateDTO);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
        
        [HttpPut]
        [Authorize]
        [Route("update")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UserNameAndNoteDTO userNameEndNoteDTO)
        {
            var userAuth = Validator(_currentUser);
            if (userAuth == null)
                return Forbidden();

            var result = await _userService.UpdateNameOrNoteAsync(userNameEndNoteDTO);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
            
        [HttpPost("update-image")]
        [Authorize]
        public async Task<IActionResult> UpdateImageUserAsync()
        {
            var userAuth = Validator(_currentUser);
            if (userAuth == null)
                return Forbidden();

            var result = await _userService.UpdateImageAsync(Request.Form.Files[0]);
            if(result.IsSuccess)
                return Ok(result);


            return BadRequest(result);
        }
           
        [HttpDelete]
        [Authorize]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteUserAsync(int id)
        {
            var userAuth = Validator(_currentUser);
            if (userAuth == null)
                return Forbidden();

            var result = await _userService.DeleteAsync(id);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

    }
}
