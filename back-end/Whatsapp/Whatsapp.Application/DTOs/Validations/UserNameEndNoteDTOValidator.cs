
using FluentValidation;

namespace Whatsapp.Application.DTOs.Validations
{
    public class UserNameEndNoteDTOValidator : AbstractValidator<UserNameAndNoteDTO>
    {
        public UserNameEndNoteDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().NotNull().WithMessage("Nome deve ser informado");
            RuleFor(x => x.Note).NotEmpty().NotNull().WithMessage("Recado deve ser informado");
        }
    }
}
