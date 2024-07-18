using System.ComponentModel.DataAnnotations;

namespace TDM.Server.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Branch { get; set; }
        public string? Department { get; set; }

    }
}
