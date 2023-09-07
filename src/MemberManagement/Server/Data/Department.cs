using System.ComponentModel.DataAnnotations;

namespace MemberManagement.Server.Data
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }

        [MinLength(1), MaxLength(250)]
        public string Name { get; set; }

        public ICollection<Person> Trainers = new List<Person>();

        public ICollection<Person> Participants = new List<Person>();

        public void AddTrainer(Person person)
        {
            Trainers.Add(person);
            person.DepartmentsTraining.Add(this);
        }

        public void AddParticipant(Person person)
        {
            Participants.Add(person);
            person.DepartmentsParticipating.Add(this);
        }
    }
}
