using FluentValidation;

namespace Whatsapp.Application.DTOs.Validations
{
    public class ContactInfoDTOValidator : AbstractValidator<ContactInfoDTO>
    {
        public ContactInfoDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().NotNull().WithMessage("Insira um nome");
            RuleFor(x => x.Email).NotEmpty().NotNull().WithMessage("Insira um email");
        }
    }
}
