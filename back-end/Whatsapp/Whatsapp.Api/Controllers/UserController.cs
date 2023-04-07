using Microsoft.AspNetCore.Mvc;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.Services.Interfaces;

namespace Whatsapp.Api.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("{email}")]
        public async Task<ActionResult> GetUserByEmailAsync(string email)
        {
            var result = await _userService.GetUserByEmailAsync(email);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpGet]
        [Route("{email}/{password}")]
        public async Task<ActionResult> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            var result = await _userService.GetUserByEmailAndPasswordAsync(email, password);
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
        [Route("update")]
        public async Task<ActionResult> UpdateUserAsync([FromBody] UserDTO userDTO)
        {
            var result = await _userService.UpdateAsync(userDTO);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
           
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<ActionResult> DeleteUserAsync(Guid id)
        {
            var result = await _userService.DeleteAsync(id);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

    }
}
