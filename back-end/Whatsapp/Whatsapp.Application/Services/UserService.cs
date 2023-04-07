using AutoMapper;
using FluentValidation;
using Whatsapp.Application.DTOs;
using Whatsapp.Application.DTOs.Validations;
using Whatsapp.Application.Service;
using Whatsapp.Application.Services.Interfaces;
using Whatsapp.Domain.Entities;
using Whatsapp.Domain.Repository;

namespace Whatsapp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<ResultService<UserDTO>> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAndPasswordAsync(email, password);
            if (user == null)
                return ResultService.Fail<UserDTO>("Usuario não encontrado");

            return ResultService.Ok<UserDTO>(_mapper.Map<UserDTO>(user));
        }

        public async Task<ResultService<UserDTO>> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
                return ResultService.Fail<UserDTO>("Usuario não encontrado");

            return ResultService.Ok<UserDTO>(_mapper.Map<UserDTO>(user));
        }

        public async Task<ResultService<UserDTO>> CreateAsync(UserCreateDTO userCreateDTO)
        {
            if(userCreateDTO == null)
                return ResultService.Fail<UserDTO>("Objeto deve ser informado");

            var valid = new UserCreateDTOValidator().Validate(userCreateDTO);
            if(!valid.IsValid)
                return ResultService.RequestError<UserDTO>("Problemas com os campos", valid);

            var user = _mapper.Map<User>(userCreateDTO);
            await _userRepository.CreateAsync(user);

            return ResultService.Ok<UserDTO>(_mapper.Map<UserDTO>(user));
        }

        public async Task<ResultService> UpdateAsync(UserDTO userDTO)
        {
            if (userDTO == null)
                return ResultService.Fail("Objeto deve ser informado");

            var valid = new UserDTOValidator().Validate(userDTO);
            if (!valid.IsValid)
                return ResultService.RequestError("Problemas com os campos", valid);

            var user = await _userRepository.GetByIdAsync(userDTO.Id);
            if (user == null)
                return ResultService.Fail("Usuario não encontrado");

            var data = _mapper.Map<UserDTO, User>(userDTO, user);
            await _userRepository.UpdateAsync(data);

            return ResultService.Ok("Atualizado com sucesso!");
        }

        public async Task<ResultService> DeleteAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return ResultService.Fail("Usuario não encontrado");

            await _userRepository.DeleteAsync(user);
            return ResultService.Ok("Deletado com sucesso");
        }

    }
}
