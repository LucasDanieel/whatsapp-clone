using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.DTOs.Validations;
using Whatsapp.Application.Service;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Integrations;
using Whatsapp.Domain.Repository;

namespace Whatsapp.Application.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ISaveImageInCloudinary _saveImageInCloudinary;

        public MessageService(IMessageRepository messageRepository, IMapper mapper, IUserRepository userRepository, ISaveImageInCloudinary saveImageInCloudinary)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _saveImageInCloudinary = saveImageInCloudinary;
        }

        public async Task<ResultService<MessageDTO>> CreateMessageWithMyContactAsync(MessageDTO messageDTO)
        {
            if (messageDTO == null)
                return ResultService.Fail<MessageDTO>("Objeto deve ser informado");

            var valid = new MessageDTOValidator().Validate(messageDTO);
            if (!valid.IsValid)
                return ResultService.RequestError<MessageDTO>("Um ou mais campos não foram informados", valid);

            if (await ValidUsers(messageDTO.UserIdSent, messageDTO.UserIdReceived) == false)
                return ResultService.Fail<MessageDTO>("Usuario não encontrado");

            var message = await _messageRepository.CreateMessageWithMyContactAsync(_mapper.Map<Message>(messageDTO));

            return ResultService.Ok<MessageDTO>(_mapper.Map<MessageDTO>(message));
        }

        public async Task<ResultService<MessageDTO>> CreateMessageWithImageAsync(IFormFile file, MessageDTO messageDTO)
        {
            if (messageDTO == null)
                return ResultService.Fail<MessageDTO>("Objeto deve ser informado");

            var valid = new MessageDTOValidator().Validate(messageDTO);
            if (!valid.IsValid)
                return ResultService.RequestError<MessageDTO>("Um ou mais campos não foram informados", valid);

            if (await ValidUsers(messageDTO.UserIdSent, messageDTO.UserIdReceived) == false)
                return ResultService.Fail<MessageDTO>("Usuario não encontrado");


            MessageDTO subMessage = messageDTO.RespondedMessage;

            var message = await _saveImageInCloudinary.SaveImagemFromChatCloudinary(file, _mapper.Map<Message>(messageDTO));

            MessageDTO newMessageDTO = _mapper.Map<MessageDTO>(message);

            newMessageDTO.RespondedMessage = subMessage;

            return ResultService.Ok<MessageDTO>(newMessageDTO);
        }

        public async Task<ResultService<ICollection<MessageDTO>>> GetMessagesWithMyContactAsync(int myId, int contactId, DateTime dateTime)
        {
            if (await ValidUsers(myId, contactId) == false)
                return ResultService.Fail<ICollection<MessageDTO>>("Usuario não encontrado");

            var messages = await _messageRepository.GetMessagesWithMyContactAsync(myId, contactId, dateTime);

            return ResultService.Ok(_mapper.Map<ICollection<MessageDTO>>(messages));
        }

        public async Task<ResultService> UpdateMessagesAsync(ICollection<MessageDTO> messageDTO)
        {
            if (messageDTO == null)
                return ResultService.Fail("Objeto deve ser informado");

            foreach (var item in messageDTO)
            {
                var valid = new MessageDTOValidator().Validate(item);
                if (!valid.IsValid)
                    return ResultService.RequestError("Um ou mais campos não foram informados", valid);
            }

            await _messageRepository.UpdateStatusMessageAsync(_mapper.Map<ICollection<Message>>(messageDTO));

            return ResultService.Ok("OK");
        }

        private async Task<bool> ValidUsers(int myId, int contactId)
        {
            User user = await _userRepository.GetByIdAsync(myId);
            if (user == null)
                return false;

            user = await _userRepository.GetByIdAsync(contactId);
            if (user == null)
                return false;

            return true;
        }
    }
}
