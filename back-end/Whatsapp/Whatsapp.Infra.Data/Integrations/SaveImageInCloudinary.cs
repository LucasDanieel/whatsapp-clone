using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Integrations;
using Whatsapp.Domain.Repository;

namespace Whatsapp.Infra.Data.Integrations
{
    public class SaveImageInCloudinary : ISaveImageInCloudinary
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly Cloudinary _cloudinary;
        private readonly string CLOUD_NAME = "CLOUD_NAME";
        private readonly string API_KEY = "API_KEY";
        private readonly string API_SECRET = "API_SECRET";

        public SaveImageInCloudinary(IUserRepository userRepository, IMessageRepository messageRepository)
        {
            var account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
            _cloudinary = new Cloudinary(account);
            _userRepository = userRepository;
            _messageRepository = messageRepository;
        }

        public async Task<string> SaveImagemCloudinary(User user, IFormFile file)
        {
            string url;

            UserImage userImg = await _userRepository.GetUserImageByUserIdAsync(user.Id);

            if (userImg != null)
            {
                url = await GetUrlImage(file.FileName, userImg.PublicId, await GetByteImage(file));
                userImg.AlterInfo(url, userImg.PublicId);
                await _userRepository.UpdateUserImageAsync(userImg);
            }
            else
            {
                var publicId = $"whatsapp/{user.Email}-{Guid.NewGuid()}";
                url = await GetUrlImage(file.FileName, publicId, await GetByteImage(file));
                UserImage newUserImg = new UserImage(user.Id, url, publicId);
                await _userRepository.CreateUserImageAsync(newUserImg);
            }

            return url;
        }

        public async Task<Message> SaveImagemFromChatCloudinary(IFormFile file, Message message)
        {
            var publicId = $"whatsapp/chat-message/id1:{message.UserIdSent}-id2:{message.UserIdReceived}-{Guid.NewGuid()}";

            string url = await GetUrlImage(file.FileName, publicId, await GetByteImage(file));

            message.ChangeInfo(url, publicId);

            await _messageRepository.CreateMessageWithMyContactAsync(message);

            return message;
        }

        private async Task<string> GetUrlImage(string fileName, string publicId, byte[] img)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(fileName, new MemoryStream(img)),
                Overwrite = true,
                PublicId = publicId,
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.ToString();
        }

        private async Task<byte[]> GetByteImage(IFormFile file)
        {

            byte[] img;

            using (var stream = new MemoryStream())
            {
                await file.OpenReadStream().CopyToAsync(stream);
                img = stream.ToArray();
            }

            return img;
        }
    }
}
