
using Whatsapp.Domain.Validations;

namespace Whatsapp.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }

        public User(string name, string email, string password)
        {
            Validator(name, email, password);
        }

        public User(Guid id, string name, string email, string password)
        {
            Validator(id, name, email, password);
        }

        private void Validator(Guid id, string name, string email, string password)
        {
            DomainValidationException.When(id.Equals("00000000-0000-0000-0000-000000000000"), "Id deve ser informado");
            Validator(name, email, password);
            Id = id;
        }

        private void Validator(string name, string email, string password)
        {
            DomainValidationException.When(string.IsNullOrEmpty(name), "Nome deve ser informado");
            DomainValidationException.When(string.IsNullOrEmpty(email), "Email deve ser informado");
            DomainValidationException.When(string.IsNullOrEmpty(password), "Senha deve ser informado");
            Name = name;
            Email = email;
            Password = password;
        }
    }
}
