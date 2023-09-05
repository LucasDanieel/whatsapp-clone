using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Globalization;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.Services;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Authentication;

namespace Whatsapp.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("message")]
    public class MessageController : BaseController
    {
        private readonly ICurrentUser _currentUser;
        private readonly IMessageService _messageService;

        public MessageController(ICurrentUser currentUser, IMessageService messageService)
        {
            _currentUser = currentUser;
            _messageService = messageService;
        }


        [HttpGet]
        [Route("get-all/{myid}/{contactId}")]
        public async Task<IActionResult> GetMessagesWithMyContact(int myid, int contactId)
        {
            var user = Validator(_currentUser);
            if (user == null)
                return Forbidden();

            string? paramDateTime = Request.Query["datetime"];
            DateTime dateTime = paramDateTime.Contains("null") == true ? DateTime.Now : DateTime.Parse(paramDateTime);
            var result = await _messageService.GetMessagesWithMyContactAsync(myid, contactId, dateTime);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateMessageWithMyContact([FromBody] MessageDTO messageDTO)
        {
            var user = Validator(_currentUser);
            if (user == null)
                return Forbidden();

            var result = await _messageService.CreateMessageWithMyContactAsync(messageDTO);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost]
        [Route("send-image")]
        public async Task<IActionResult> CreateMessageWithImage()
        {
            var user = Validator(_currentUser);
            if (user == null)
                return Forbidden();

            StringValues json;
            Request.Form.TryGetValue("Message", out json);

            MessageDTO messageDTO = JsonConvert.DeserializeObject<MessageDTO>(json);
            var result = await _messageService.CreateMessageWithImageAsync(Request.Form.Files[0], messageDTO);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
    }
}
