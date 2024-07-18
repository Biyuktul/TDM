using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TDM.Server.DBContext;
using TDM.Server.Model;

namespace TDM.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly TDMSDBContext _context;

        public UsersController(TDMSDBContext context)
        {
            _context = context;
        }

        [HttpGet("allusers")]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            var result = await _context.User.ToListAsync();

            return result;
        }

        [HttpPost("adduser")]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            var result = new User()
            {
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                Branch = user.Branch,
                Department = user.Department,
            };
            _context.User.Add(result);
            await _context.SaveChangesAsync();
            return result;
        }
    }
}


