
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Whatsapp.Domain.Validations;

namespace Whatsapp.Domain.Entities
{
    public class User
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public string? Note { get; private set; }
        public DateTime? LastAccess { get; private set; }
        public UserImage UserImage { get; private set; }
        [NotMapped]
        public Message? LastMessage { get; private set; }
        [NotMapped]
        public int CountMessage { get; private set; }

        public User()
        { }

        public User(string name, string email, string password)
        {
            Validator(name, email, password);
        }

        public User(string name, string email, string password, string? note)
        {
            Validator(name, email, password);
            Note = note;
        }

        // Construtor para resgatar a conta do usuario
        public User(int id, string name, string email, string? note, UserImage userImage)
        {
            DomainValidationException.When(id <= 0, "Id deve ser informado");
            Id = id;
            Validator(name, email);
            Note = note;
            UserImage = userImage;
        }

        // Construtor para resgatar a conta de um novo contato
        public User(int id, string name, string email, string? note, DateTime? lastAccess, UserImage userImage) : this(id, name, email, note, userImage)
        {
            LastAccess = lastAccess;
        }

        public User(int id, string name, string email, string? note, DateTime? lastAccess, UserImage userImage, Message lastMessage, int countMessage)
        {
            DomainValidationException.When(id <= 0, "Id deve ser informado");
            Id = id;
            Validator(name, email);
            Note = note;
            LastAccess = lastAccess;
            UserImage = userImage;
            LastMessage = lastMessage;
            CountMessage = countMessage;
        }

        public User(int id, string name, string email, string password, string? note, DateTime? lastAccess)
        {
            DomainValidationException.When(id <= 0, "Id deve ser informado");
            Id = id;
            Validator(name, email, password);
            Note = note;
            LastAccess = lastAccess;
        }

        public void AddDot()
        {
            Note = ".";
        }

        public void UpdateLastAccess()
        {
            LastAccess = DateTime.Now;
        }

        private void Validator(string name, string email)
        {
            DomainValidationException.When(string.IsNullOrEmpty(name), "Nome deve ser informado");
            DomainValidationException.When(string.IsNullOrEmpty(email), "Email deve ser informado");
            Name = name;
            Email = email;
        }

        private void Validator(string name, string email, string password)
        {
            Validator(name, email);
            DomainValidationException.When(string.IsNullOrEmpty(password), "Senha deve ser informado");
            Password = password;
        }
    }
}
