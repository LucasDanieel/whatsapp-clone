using FluentValidation;

namespace Whatsapp.Application.DTOs.Validations
{
    public class UserCreateDTOValidator : AbstractValidator<UserCreateDTO>
    {
        public UserCreateDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().NotNull().WithMessage("Insira um nome");
            RuleFor(x => x.Email).NotEmpty().NotNull().WithMessage("Insira um email");
            RuleFor(x => x.Password).NotEmpty().NotNull().WithMessage("Insira um senha");
        }
    }
}
