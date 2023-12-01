using System.ComponentModel.DataAnnotations;

namespace MemberManagement.Shared
{
    public class Person
    {
        [Key]
        public int PersonId { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "LastName is too long (max. 50 characters)!")]
        public required string LastName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50, ErrorMessage = "FirstName is too long (max. 50 characters)!")]
        public required string FirstName { get; set; } = string.Empty;

        [MaxLength(50, ErrorMessage = "Street is too long (max. 50 characters)!")]
        public string Street { get; set; } = string.Empty;

        [MaxLength(20, ErrorMessage = "HouseNumber is too long (max. 20 characters)!")]
        public string HouseNumber { get; set; } = string.Empty;

        public int? Postcode { get; set; } = 0;

        [MaxLength(50, ErrorMessage = "City is too long (max. 50 characters)!")]
        public string City { get; set; } = string.Empty;

        public Gender Gender { get; set; } = Gender.None;

        [MaxLength(250, ErrorMessage = "Email is too long (max. 250 characters)!")]
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

        public Person Clone()
        {
            var person = new Person
            {
                PersonId = PersonId,
                LastName = LastName,
                FirstName = FirstName,
                Street = Street,
                HouseNumber = HouseNumber,
                Postcode = Postcode,
                City = City,
                Gender = Gender,
                Email = Email,
                BornOn = BornOn,
                JoinedOn = JoinedOn,
                ExitedOn = ExitedOn,
                DeceasedOn = DeceasedOn,
                IsStudent = IsStudent,
                IsPensioner = IsPensioner,
                PaysCash = PaysCash,
                DepartmentsTraining = DepartmentsTraining,
                DepartmentsParticipating = DepartmentsParticipating
            };

            return person;
        }

        public void Copy(Person person)
        {
            PersonId = person.PersonId;
            LastName = person.LastName;
            FirstName = person.FirstName;
            Street = person.Street;
            HouseNumber = person.HouseNumber;
            Postcode = person.Postcode;
            City = person.City;
            Gender = person.Gender;
            Email = person.Email;
            BornOn = person.BornOn;
            JoinedOn = person.JoinedOn;
            ExitedOn = person.ExitedOn;
            DeceasedOn = person.DeceasedOn;
            IsStudent = person.IsStudent;
            IsPensioner = person.IsPensioner;
            PaysCash = person.PaysCash;
            DepartmentsTraining = person.DepartmentsTraining;
            DepartmentsParticipating = person.DepartmentsParticipating;
        }
    }
}
