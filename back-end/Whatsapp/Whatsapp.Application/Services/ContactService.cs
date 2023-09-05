using AutoMapper;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.DTOs.Validations;
using Whatsapp.Application.Service;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Repository;

namespace Whatsapp.Application.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactBondRepository _contactBondRepository;
        private readonly IMapper _mapper;

        public ContactService(IContactBondRepository contactBondRepository, IMapper mapper)
        {
            _contactBondRepository = contactBondRepository;
            _mapper = mapper;
        }

        public async Task<ResultService<ICollection<ContactInfoDTO>>> GetAllMyContactsAsync(int myId)
        {
            var contacts = await _contactBondRepository.GetAllMyContactsAsync(myId);
            if (contacts == null)
                return ResultService.Fail<ICollection<ContactInfoDTO>>("Contatos não encontrados");

            return ResultService.Ok(_mapper.Map<ICollection<ContactInfoDTO>>(contacts));
        }

        public async Task<ResultService<ICollection<UserDTO>>> GetNewContactByEmailAsync(string email, int id)
        {
            var user = await _contactBondRepository.GetByEmailAsync(email, id);
            if (user == null)
                return ResultService.Fail<ICollection<UserDTO>>("Usuario não encontrado");

            return ResultService.Ok(_mapper.Map<ICollection<UserDTO>>(user));
        }

        public async Task<ResultService> CreateContactBondAsync(ContactBondDTO contactBondDTO)
        {
            if (contactBondDTO == null)
                return ResultService.Fail("Objeto deve ser informado");

            var valid = new ContactBondDTOValidator().Validate(contactBondDTO);
            if(!valid.IsValid)
                return ResultService.RequestError("Objeto deve ser informado", valid);

            var bond = await _contactBondRepository.GetBondAsync(contactBondDTO.UserIdSent, contactBondDTO.UserIdReceived);
            if(bond != null)
                return ResultService.Fail("Ligação de contatos já existe");

            bool userValid = await _contactBondRepository.CreateContactBondAsync(_mapper.Map<ContactBond>(contactBondDTO));
            if(userValid == false)
                return ResultService.Fail("Contato para união não encontrado");

            return ResultService.Ok("Relacionamento criado");
        }
    }
}
