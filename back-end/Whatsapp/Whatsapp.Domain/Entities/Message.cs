using System;
using System.ComponentModel.DataAnnotations.Schema;
using Whatsapp.Domain.Validations;

namespace Whatsapp.Domain.Entities
{
    public class Message
    {
        public int Id { get; private set; }
        public string? Text { get; private set; }
        public int UserIdSent { get; private set; }
        public int UserIdReceived { get; private set; }
        public DateTime? DateTime { get; private set; }
        public int MessageStatus { get; private set; }
        public string? ImageUrl { get; private set; }
        public string? PublicId { get; private set; }
        public int? RespondedMessageId { get; private set; }
        public Message? RespondedMessage { get; private set; }

        public Message(int id, string text, int userIdSent, int userIdReceived, DateTime? dateTime, int messageStatus, string imageUrl, string publicId, int? respondedMessageId, Message? respondedMessage)
        {
            Validator(userIdSent, userIdReceived);
            Id = id;
            Text = text;
            DateTime = dateTime;
            MessageStatus = messageStatus;
            ImageUrl = imageUrl;
            PublicId = publicId;
            RespondedMessageId = respondedMessageId;
            RespondedMessage = respondedMessage;
        }

        public Message(string text, int userIdSent, int userIdReceived, DateTime? dateTime, int messageStatus)
        {
            Validator(userIdSent, userIdReceived);
            Text = text;
            DateTime = dateTime;
            MessageStatus = messageStatus;
        }

        public void ChangeInfo(string imageUrl, string publicId)
        {
            ImageUrl = imageUrl;
            PublicId = publicId;
        }
        
        public void Nulll()
        {
            RespondedMessage = null;
        }

        private void Validator(int userIdSent, int userIdReceived)
        {
            DomainValidationException.When(userIdSent <= 0, "Id de quem enviou deve ser informado");
            DomainValidationException.When(userIdReceived <= 0, "Id de quem recebeu deve ser informado");
            UserIdSent = userIdSent;
            UserIdReceived = userIdReceived;
        }
    }
}
