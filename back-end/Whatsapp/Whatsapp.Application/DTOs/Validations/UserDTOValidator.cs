using FluentValidation;

namespace Whatsapp.Application.DTOs.Validations
{
    public class UserDTOValidator : AbstractValidator<UserDTO>
    {
        public UserDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().NotNull().WithMessage("Insira um nome");
            RuleFor(x => x.Email).NotEmpty().NotNull().WithMessage("Insira um email");
        }
    }
}
