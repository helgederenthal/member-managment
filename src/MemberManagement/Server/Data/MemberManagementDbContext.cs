using Microsoft.EntityFrameworkCore;

namespace MemberManagement.Server.Data
{
    public partial class MemberManagementDbContext : DbContext
    {
        public MemberManagementDbContext(DbContextOptions<MemberManagementDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Person> Persons { get; set; }

        public virtual DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>(p =>
            {
                p.HasMany(p => p.DepartmentsParticipating).WithMany(d => d.Participants).UsingEntity("DepartmentParticipations");
            });

            modelBuilder.Entity<Person>(p =>
            {
                p.HasMany(p => p.DepartmentsTraining).WithMany(d => d.Trainers).UsingEntity("DepartmentTrainers");
            });
        }
    }
}
