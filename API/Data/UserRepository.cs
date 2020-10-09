using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data {
    public class UserRepository : IUserRepository {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        public UserRepository (DataContext dataContext, IMapper mapper) {
            _mapper = mapper;
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<MemberDto>> GetAllMembersAsync () {
           return await _dataContext.Users
           .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
           .ToListAsync();
        }

        public async Task<IEnumerable<AppUser>> GetAllUsersAsync () {
            return await _dataContext.Users
                .Include (p => p.Photos)
                .ToListAsync ();
        }

        public async Task<MemberDto> GetMemberByUsernamesAsync (string username) {
            return await _dataContext.Users
                .Where (u => u.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<AppUser> GetUerByIdAsync (int id) {
            return await _dataContext.Users.FindAsync (id);
        }

        public async Task<AppUser> GetUserByUsernamesAsync (string username) {
            return await _dataContext.Users
                .Include (p => p.Photos)
                .SingleOrDefaultAsync (x => x.UserName == username);
        }

        public async Task<bool> SaveAllAsync () {
            return await _dataContext.SaveChangesAsync () > 0;
        }

        public void UpdateUser (AppUser user) {
            _dataContext.Entry (user).State = EntityState.Modified;
        }
    }
}