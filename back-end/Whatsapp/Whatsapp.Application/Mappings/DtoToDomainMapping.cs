using AutoMapper;
using Whatsapp.Application.DTOs;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Application.Mappings
{
    public class DtoToDomainMapping : Profile
    {
        public DtoToDomainMapping()
        {
            CreateMap<UserDTO, User>();
            CreateMap<UserCreateDTO, User>();
            CreateMap<UserNameAndNoteDTO, User>();
            CreateMap<ContactBondDTO, ContactBond>();
            CreateMap<MessageDTO, Message>()
                .ForMember(x => x.DateTime, opt => opt.Ignore())
                .ConstructUsing((model, context) =>
                {
                    Message subMessage = null;
                    if(model.RespondedMessage != null)
                    {
                        subMessage = new Message(
                        model.Id,
                        model.Text,
                        model.UserIdSent,
                        model.UserIdReceived,
                        DateTime.Parse(model.DateTime),
                        model.MessageStatus,
                        model.ImageUrl,
                        model.PublicId,
                        model.RespondedMessageId,
                        null);
                    }


                    return new Message(
                        model.Id,
                        model.Text,
                        model.UserIdSent,
                        model.UserIdReceived,
                        DateTime.Parse(model.DateTime),
                        model.MessageStatus,
                        model.ImageUrl,
                        model.PublicId,
                        model.RespondedMessageId,
                        subMessage != null ? subMessage : null);
                });
        }
    }
}
