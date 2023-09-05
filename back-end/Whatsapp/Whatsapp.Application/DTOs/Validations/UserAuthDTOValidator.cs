using FluentValidation;

namespace Whatsapp.Application.DTOs.Validations
{
    public class UserAuthDTOValidator : AbstractValidator<UserAuthDTO>
    {
        public UserAuthDTOValidator()
        {
            RuleFor(x => x.Email).NotEmpty().NotNull().WithMessage("Campo de Email vazio");
            RuleFor(x => x.Password).NotEmpty().NotNull().WithMessage("Campo de Senha vazio");
        }
    }
}
