using AutoMapper;
using WaveCloud.Data;
using WaveCloud.Models;
using WaveCloud.Models.ViewModels;
using WaveCloud.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WaveCloud.Repository.Extension;

namespace WaveCloud.Repository
{
    public class AccountRepository
    {
        private readonly AuthRepository _auth;
        private readonly ApplicationDbContext _ctx;
        private readonly IMapper _mapper;
        public AccountRepository(AuthRepository auth,
            ApplicationDbContext context,
            IMapper mapper)
        {
            _auth = auth;
            _ctx = context;
            _mapper = mapper;
        }

        public async ValueTask<(string, string)> LoginUser(LoginViewModel model)
        {
            var loginPassword = model.Password;
            var user = await _ctx.Users.Where(x => x.Email.ToLower() == model.Email.ToLower())
                                                .FirstOrDefaultAsync();
            if(user == null) { return (null, "no such user in the database"); }
            
            string incomingHash = Hash.GetHashedValue(loginPassword);
            if(incomingHash != user.PasswordHash)
            {
                return (null, "password do not match");
            }
            return (_auth.GetToken(model.Email, user.IsAdmin), null);
        }

        public async ValueTask<(string, string)> RegisterUser(RegisterViewModel model)
        {
            if(model.Password == model.ConfirmPassword)
            {
                bool hasAccount = false;
                try
                {
                    hasAccount = _ctx.Users.Any(u => u.Email.ToLower() == model.Email.ToLower());
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return (null, ex.Message);
                }
                if (hasAccount) { return (null, "user already exists"); }

                string passwordHash = Hash.GetHashedValue(model.Password);
                ApplicationUser user = model.Convert<RegisterViewModel, ApplicationUser>(_mapper);
                user.PasswordHash = passwordHash;
                user.IsAdmin = CheckAdmin(model.Email);
                try
                {
                    _ctx.Users.Add(user);
                    _ctx.SaveChanges();
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Message: {ex.Message}");
                    return (null, ex.Message);
                }
                return (await LoginUser(new LoginViewModel { Email = model.Email, Password = model.Password }));
            }
            return (null, "password must match");
            
        }

        private static bool CheckAdmin(string email)
        {
            var adminEmails = Startup.Configuration.GetSection("AdminEmails")
                                                                    .AsEnumerable()
                                                                    .Where(e => !string.IsNullOrEmpty(e.Value))
                                                                    .Select(e => e.Value);
            return adminEmails.Contains(email, StringComparer.OrdinalIgnoreCase);
        }

        public async ValueTask<bool> ChangePassword(PatchKnownPasswordDTO patch)
        {
            ApplicationUser user = await GetUserById(patch.Id);
            if(user != null)
            {
                string passwordHash = Hash.GetHashedValue(patch.OldPassword);
                if(passwordHash == user.PasswordHash)
                {
                    string newHashedPassword = Hash.GetHashedValue(patch.NewPassword);
                    user.PasswordHash = newHashedPassword;
                    return await UpdateUser(user);
                }
            }
            return false;
        }

        public async ValueTask<bool> ForgotPassword(PatchUnknownPasswordDTO patch)
        {
            ApplicationUser user = await GetUserByEmail(patch.Email);
            if (user != null)
            {
                if (patch.NewPassword == patch.ConfirmNewPassword)
                {
                    string passwordHash = Hash.GetHashedValue(patch.NewPassword);
                    user.PasswordHash = passwordHash;
                    return await UpdateUser(user);
                }
                
            }
            return false;
        }
        
        public async ValueTask<bool> UpdateUser(ApplicationUser user)
        {
            try
            {
                _ctx.Users.Update(user);
                await _ctx.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            return false;
        }

        public async ValueTask<ApplicationUser> GetUserById(string id) => await _ctx.Users.FindAsync(id);
        public async ValueTask<ApplicationUser> GetUserByEmail(string email)
        {
            return await _ctx.Users.Where(u => u.Email.ToLower() == email.ToLower()).FirstAsync();
        }
    }
}
