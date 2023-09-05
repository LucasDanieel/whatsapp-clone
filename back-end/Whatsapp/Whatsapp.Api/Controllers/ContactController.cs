using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.Services;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Authentication;

namespace Whatsapp.Api.Controllers
{
    [ApiController]
    [Route("contact")]
    public class ContactController : BaseController
    {
        private readonly IContactService _contactService;
        private readonly ICurrentUser _currentUser;

        public ContactController(IContactService contactService, ICurrentUser currentUser)
        {
            _contactService = contactService;
            _currentUser = currentUser;
        }

        [HttpGet]
        [Authorize]
        [Route("get-all/{myId}")]
        public async Task<IActionResult> GetMyContactsAsync(int myId)
        {
            var userAuth = Validator(_currentUser);
            if (userAuth == null)
                return Forbidden();

            var result = await _contactService.GetAllMyContactsAsync(myId);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpGet]
        [Authorize]
        [Route("new-contacts/{email}/{id:int}")]
        public async Task<IActionResult> GetNewContactByEmailAsync(string email, int id)
        {
            var userAuth = Validator(_currentUser);
            if (userAuth == null)
                return Forbidden();

            var result = await _contactService.GetNewContactByEmailAsync(email, id);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost]
        [Authorize]
        [Route("create-bond")]
        public async Task<IActionResult> CreateBondBetweenUserAsync([FromBody] ContactBondDTO contectBondDTO)
        {
            var userAuth = Validator(_currentUser);
            if (userAuth == null)
                return Forbidden();

            var result = await _contactService.CreateContactBondAsync(contectBondDTO);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
    }
}
