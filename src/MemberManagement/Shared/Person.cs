using System.ComponentModel.DataAnnotations;

namespace MemberManagement.Shared
{
    public class Person
    {
        [Key]
        public int PersonId { get; set; }

        [Required]
        [MinLength(1), MaxLength(50)]
        public required string LastName { get; set; } = string.Empty;

        [Required]
        [MinLength(1), MaxLength(50)]
        public required string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Street { get; set; } = string.Empty;

        [MaxLength(20)]
        public string HouseNumber { get; set; } = string.Empty;

        public int Postcode { get; set; } = 0;

        [MaxLength(50)]
        public string City { get; set; } = string.Empty;

        public Gender Gender { get; set; } = Gender.None;

        [MaxLength(250)]
        public string Email { get; set; } = string.Empty;

        public DateTime? BornOn { get; set; }

        public DateTime? JoinedOn { get; set; }

        public DateTime? ExitedOn { get; set; }

        public DateTime? DeceasedOn { get; set; }

        public bool PaysCash { get; set; } = false;

        public bool IsStudent { get; set; } = false;

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
