using Microsoft.AspNetCore.SignalR;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.Service;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Repository;

namespace Whatsapp.Api.ChatHub
{
    public class ChatHub : Hub
    {
        private readonly static ConnectionMapping _connectionMapping = new();
        private readonly IMessageService _messageService;
        private readonly IUserService _userService;
        private readonly IUserRepository _userRepository;

        public ChatHub(IMessageService messageService, IUserService userService, IUserRepository userRepository)
        {
            _messageService = messageService;
            _userService = userService;
            _userRepository = userRepository;
        }

        public async Task OnConnection(string email, string[] userEmails)
        {
            _connectionMapping.Add(email, Context.ConnectionId);

            foreach (string sendTo in userEmails)
            {
                string connection = _connectionMapping.GetConnectionString(sendTo);
                await Clients.Client(connection).SendAsync("IsConnected", email);
            }
        }

        public async Task SendMessage(string sentFrom, string sendTo, MessageDTO messageDTO, bool saveInDB)
        {
            if (saveInDB)
            {
                MessageDTO subMessageDTO = messageDTO.RespondedMessage;
                messageDTO.RespondedMessage = null;

                var newMessageDTO = await _messageService.CreateMessageWithMyContactAsync(messageDTO);

                newMessageDTO.Data.RespondedMessage = subMessageDTO;

                string connection = _connectionMapping.GetConnectionString(sendTo);
                await Clients.Client(connection).SendAsync("ReceivedMsg", sentFrom, newMessageDTO.Data);

                await Clients.Client(Context.ConnectionId).SendAsync("ChangeMessageId", newMessageDTO.Data);
            }
            else
            {
                string connection = _connectionMapping.GetConnectionString(sendTo);
                await Clients.Client(connection).SendAsync("ReceivedMsg", sentFrom, messageDTO);
            }
        }

        public async Task UpdateMessage(string sentFrom, string sendTo, ICollection<MessageDTO> messageDTO)
        {
            await _messageService.UpdateMessagesAsync(messageDTO);

            string connection = _connectionMapping.GetConnectionString(sendTo);

            await Clients.Client(connection).SendAsync("UpdateThisMsg", sentFrom, messageDTO);
        }

        public async Task VerifyContactConnection(string email)
        {
            string connection = _connectionMapping.GetConnectionString(email);
            if (string.IsNullOrEmpty(connection))
                await Clients.Client(Context.ConnectionId).SendAsync("IsOnline", false);
            else
                await Clients.Client(Context.ConnectionId).SendAsync("IsOnline", true);
        }

        public async Task Writing(string sentFrom, string sendTo)
        {
            string connection = _connectionMapping.GetConnectionString(sendTo);
            if (string.IsNullOrEmpty(connection)) return;

            await Clients.Client(connection).SendAsync("IsWriting", sentFrom);
        }

        public async Task AddNewContact(string sentTo, int contactId)
        {
            string connection = _connectionMapping.GetConnectionString(sentTo);

            if (string.IsNullOrEmpty(connection)) return;

            ResultService<UserDTO> newContact = await _userService.GetNewContactAsync(contactId);

            await Clients.Client(connection).SendAsync("UpdateContacts", newContact.Data);
        }

        public async Task NewImageFromContact(string sendFrom, string imageUrl, string[] contacts)
        {
            foreach (string contact in contacts)
            {
                string connection = _connectionMapping.GetConnectionString(contact);
                if (string.IsNullOrEmpty(connection)) continue;

                await Clients.Client(connection).SendAsync("UpdateImageContact", sendFrom, imageUrl);
            }
        }
        
        public async Task NewNameOrNote(string sendFrom, string name, string note, string[] contacts)
        {
            foreach (string contact in contacts)
            {
                string connection = _connectionMapping.GetConnectionString(contact);
                if (string.IsNullOrEmpty(connection)) continue;

                await Clients.Client(connection).SendAsync("UpdateNameOrNote", sendFrom, name, note);
            }
        }

        //public override async Task OnDisconnectedAsync(Exception? exception)
        //{
        //    string email = _connectionMapping.GetEmail(Context.ConnectionId);
        //    if (!string.IsNullOrEmpty(email)) await _userRepository.UpdateLastAccess(email);

        //    await Clients.All.SendAsync("Disconnected", email);
        //    _connectionMapping.Disconnected(email);
        //    base.OnDisconnectedAsync(exception);
        //}

        public async Task OnDisconnected(string[] contactEmails, string email)
        {
            DateTime time = await _userRepository.UpdateLastAccess(email);
            foreach (string sendTo in contactEmails)
            {
                string connection = _connectionMapping.GetConnectionString(sendTo);
                await Clients.Client(connection).SendAsync("Disconnected", email, time);
            }
            _connectionMapping.Disconnected(email);
        }
    }
}
