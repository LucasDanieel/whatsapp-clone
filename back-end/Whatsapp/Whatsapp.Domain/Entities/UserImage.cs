
using Whatsapp.Domain.Validations;

namespace Whatsapp.Domain.Entities
{
    public class UserImage
    {
        public int Id { get; private set; }
        public string ImageUrl { get; private set; }
        public string PublicId { get; private set; }
        public int UserId { get; private set; }
        public User User { get; private set; }
        
        public UserImage(string imageUrl)
        {
            ImageUrl = imageUrl;
        }
        public UserImage(int userId, string imageUrl, string publicId)
        {
            Validator(userId, imageUrl, publicId);
        }
        public UserImage(int id, int userId, string imageUrl, string publicId)
        {
            DomainValidationException.When(id <= 0, "Id da imagem deve ser informado");
            Validator(userId, imageUrl, publicId);
            Id = id;
        }

        public void AlterInfo(string imageUrl, string publicId)
        {
            DomainValidationException.When(string.IsNullOrEmpty(imageUrl), "Url da imagem deve ser informado");
            DomainValidationException.When(string.IsNullOrEmpty(publicId), "PublicId deve ser informado");
            ImageUrl = imageUrl;
            PublicId = publicId;
        }

        private void Validator(int userId, string imageUrl, string publicId)
        {
            DomainValidationException.When(userId <= 0, "Id do usuario deve ser informado");
            DomainValidationException.When(string.IsNullOrEmpty(imageUrl), "Url da imagem deve ser informado");
            DomainValidationException.When(string.IsNullOrEmpty(publicId), "PublicId deve ser informado");
            UserId = userId;
            ImageUrl = imageUrl;
            PublicId = publicId;
        }
    }
}
