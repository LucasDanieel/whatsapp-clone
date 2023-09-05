using AutoMapper;
using Whatsapp.Application.DTOs;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Application.Mappings
{
    public class DomainToDtoMapping : Profile
    {
        public DomainToDtoMapping()
        {
            CreateMap<User, UserDTO>()
                .ConstructUsing((model, context) =>
                {
                    var userDTO = new UserDTO
                    {
                        Id = model.Id,
                        Name = model.Name,
                        Email = model.Email,
                        Note = model.Note,
                        ImageUrl = model.UserImage?.ImageUrl ?? null,
                        LastAccess = model.LastAccess
                    };

                    return userDTO;
                });
            CreateMap<User, UserCreateDTO>();
            CreateMap<User, ContactInfoDTO>()
               .ConstructUsing((model, context) =>
               {
                   var userDTO = new ContactInfoDTO
                   {
                       Id = model.Id,
                       Name = model.Name,
                       Email = model.Email,
                       Note = model.Note,
                       ImageUrl = model.UserImage?.ImageUrl ?? null,
                       LastAccess = model.LastAccess,
                       LastMessage = model.LastMessage,
                       CountMessage = model.CountMessage,
                   };

                   return userDTO;
               });
            //CreateMap<User, NewContactDTO>()
            //    .ConstructUsing((model, context) =>
            //    {
            //        var newContactDTO = new NewContactDTO
            //        {
            //            Id = model.Id,
            //            Name = model.Name,
            //            Email = model.Email,
            //            Note = model.Note,
            //            ImageUrl = model.UserImage?.ImageUrl ?? null
            //        };

            //        return newContactDTO;
            //    });
            CreateMap<Message, MessageDTO>()
                .ForMember(x => x.DateTime, opt => opt.Ignore())
                .ConstructUsing((model, context) =>
                {
                    MessageDTO subMessageDTO = null;
                    if (model.RespondedMessage != null)
                    {
                        subMessageDTO = new MessageDTO
                        {
                            Id = model.RespondedMessage.Id,
                            Text = model.RespondedMessage.Text,
                            UserIdSent = model.RespondedMessage.UserIdSent,
                            UserIdReceived = model.RespondedMessage.UserIdReceived,
                            DateTime = model.RespondedMessage.DateTime?.ToString("yyyy-MM-ddTHH:mm:ss.fff"),
                            MessageStatus = model.RespondedMessage.MessageStatus,
                            ImageUrl = model.RespondedMessage.ImageUrl,
                            PublicId = model.RespondedMessage.PublicId,
                            RespondedMessageId = model.RespondedMessageId,
                            RespondedMessage = null,
                        };
                    }

                    var messages = new MessageDTO
                    {
                        Id = model.Id,
                        Text = model.Text,
                        UserIdSent = model.UserIdSent,
                        UserIdReceived = model.UserIdReceived,
                        DateTime = model.DateTime?.ToString("yyyy-MM-ddTHH:mm:ss.fff"),
                        MessageStatus = model.MessageStatus,
                        ImageUrl = model.ImageUrl,
                        PublicId = model.PublicId,
                        RespondedMessageId = model.RespondedMessageId,
                        RespondedMessage = subMessageDTO,
                    };

                    return messages;
                });
        }
    }
}
