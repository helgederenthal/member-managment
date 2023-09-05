using Microsoft.EntityFrameworkCore;

namespace MemberManagement.Server.Data
{
    public class Person
    {
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Street { get; set; }

        public string? HouseNumber { get; set; }

        public int? Postcode { get; set; }

        public string? City { get; set; }

        public string? Email { get; set; }

        public virtual ICollection<Department> Departments { get; set; } = new List<Department>();
    }
}
