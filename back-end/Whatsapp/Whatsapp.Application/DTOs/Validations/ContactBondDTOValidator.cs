using FluentValidation;

namespace Whatsapp.Application.DTOs.Validations
{
    internal class ContactBondDTOValidator : AbstractValidator<ContactBondDTO>
    {
        public ContactBondDTOValidator()
        {
            RuleFor(x => x.UserIdSent).GreaterThan(0).WithMessage("Id de quem enviou deve ser informado");
            RuleFor(x => x.UserIdReceived).GreaterThan(0).WithMessage("Id de quem recebeu deve ser informado");
        }
    }
}
