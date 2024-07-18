using Microsoft.EntityFrameworkCore;
using TDM.Server.Model;

namespace TDM.Server.DBContext
{
    public class TDMSDBContext : DbContext
    {
        public TDMSDBContext(DbContextOptions<TDMSDBContext> options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
    }
}
