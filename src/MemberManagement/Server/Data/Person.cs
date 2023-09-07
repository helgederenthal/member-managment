using System.ComponentModel.DataAnnotations;

namespace MemberManagement.Server.Data
{
    public class Person
    {
        [Key]
        public int PersonId { get; set; }

        [Required]
        [MinLength(1), MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(1), MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MinLength(1), MaxLength(50)]
        public string Street { get; set; }

        [Required]
        [MinLength(1), MaxLength(20)]
        public string HouseNumber { get; set; }

        [Required]
        public int? Postcode { get; set; }

        [Required]
        [MinLength(1), MaxLength(50)]
        public string City { get; set; }

        [MinLength(1), MaxLength(250)]
        public string? Email { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? JoinedAt { get; set; }

        public DateTime? ExitedAt { get; set; }

        public bool PaysCash{ get; set; } = false;

        public bool IsStudent{ get; set; } = false;

        public bool IsPensioner { get; set; } = false;

        public virtual ICollection<Department> DepartmentsTraining { get; set; } = new List<Department>();

        public virtual ICollection<Department> DepartmentsParticipating { get; set; } = new List<Department>();

        public void AddDepartmentTraining(Department department)
        {
            DepartmentsTraining.Add(department);
            department.Trainers.Add(this);
        }

        public void AddDepartmentParticipation(Department department)
        {
            DepartmentsParticipating.Add(department);
            department.Participants.Add(this);
        }
    }
}
