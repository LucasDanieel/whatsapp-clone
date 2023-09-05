using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.DTOs.Validations;
using Whatsapp.Application.Service;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Authentication;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Integrations;
using Whatsapp.Domain.Repository;

namespace Whatsapp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ISaveImageInCloudinary _saveImageInCloudinary;
        private readonly ITokenGenerator _tokenGenerator;

        public UserService(IUserRepository userRepository, IMapper mapper, ISaveImageInCloudinary saveImageInCloudinary, ITokenGenerator tokenGenerator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _saveImageInCloudinary = saveImageInCloudinary;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<ResultService<UserDTO>> AuthUserByEmailAndPasswordAsync(UserAuthDTO userAuthDTO)
        {
            if (userAuthDTO == null)
                return ResultService.Fail<UserDTO>("Objeto deve ser informado");

            var valid = new UserAuthDTOValidator().Validate(userAuthDTO);
            if (!valid.IsValid)
                return ResultService.RequestError<UserDTO>("Um ou mais campos vazio ou invalidos", valid);

            var user = await _userRepository.GetByEmailAndPasswordAsync(userAuthDTO.Email, userAuthDTO.Password);
            if(user == null)
                return ResultService.Fail<UserDTO>("Usuario não encontrado");

            var userDTO = _mapper.Map<UserDTO>(user);

            return ResultService.Ok<UserDTO>(userDTO);
        }

        public async Task<ResultService<UserDTO>> GetNewContactAsync(int contactId)
        {
            User user = await _userRepository.GetUserAsContatcByIdAsync(contactId);
            if (user == null)
                return ResultService.Fail<UserDTO>("Contato não encontrado!");

            return ResultService.Ok<UserDTO>(_mapper.Map<UserDTO>(user));
        } 

        public async Task<ResultService<string>> ValidateUserAsync(string email, string password)
        {
            var user = await _userRepository.ValidateAsync(email, password);
            if (user == null)
                return ResultService.Fail<string>("Usuario não encontrado");

            return ResultService.Ok<string>(_tokenGenerator.Generator(user));
        }

        public async Task<ResultService<string>> CreateAsync(UserCreateDTO userCreateDTO)
        {
            if(userCreateDTO == null)
                return ResultService.Fail<string>("Objeto deve ser informado");

            var valid = new UserCreateDTOValidator().Validate(userCreateDTO);
            if(!valid.IsValid)
                return ResultService.RequestError<string>("Problemas com os campos", valid);

            var user = _mapper.Map<User>(userCreateDTO);
            user.AddDot();
            await _userRepository.CreateAsync(user);

            return ResultService.Ok<string>(_tokenGenerator.Generator(user));
        }

        public async Task<ResultService> UpdateNameOrNoteAsync(UserNameAndNoteDTO userNameEndNoteDTO)
        {
            if (userNameEndNoteDTO == null)
                return ResultService.Fail("Objeto deve ser informado");

            var valid = new UserNameEndNoteDTOValidator().Validate(userNameEndNoteDTO);
            if (!valid.IsValid)
                return ResultService.RequestError("Problemas com os campos", valid);

            var user = await _userRepository.GetByIdAsync(userNameEndNoteDTO.Id);
            if (user == null)
                return ResultService.Fail("Usuario não encontrado");

            var data = _mapper.Map(userNameEndNoteDTO, user);
            await _userRepository.UpdateAsync(data);

            return ResultService.Ok("Atualizado com sucesso!");
        }

        public async Task<ResultService<string>> UpdateImageAsync(IFormFile file)
        {
            if (file == null)
                return ResultService.Fail<string>("Objeto deve ser informado");

            var user = await _userRepository.GetByIdAsync(int.Parse(file.Name));
            if (user == null)
                return ResultService.Fail<string>("Usuario não encontrado");

            string url = await _saveImageInCloudinary.SaveImagemCloudinary(user, file);

            return ResultService.Ok<string>(url);
        }

        public async Task<ResultService> DeleteAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return ResultService.Fail("Usuario não encontrado");

            await _userRepository.DeleteAsync(user);
            return ResultService.Ok("Deletado com sucesso");
        }

    }
}
