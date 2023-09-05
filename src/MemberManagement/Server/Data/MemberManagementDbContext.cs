using Microsoft.EntityFrameworkCore;

namespace MemberManagement.Server.Data
{
    public partial class MemberManagementDbContext : DbContext
    {
        public MemberManagementDbContext()
        {
        }

        public MemberManagementDbContext(DbContextOptions<MemberManagementDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Persons__3214EC07039D972A");

                entity.Property(e => e.FirstName).HasMaxLength(50);
                entity.Property(e => e.LastName).HasMaxLength(50);
                entity.Property(e => e.Street).HasMaxLength(50);
                entity.Property(e => e.HouseNumber).HasMaxLength(20);
                entity.Property(e => e.City).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(250);
            });
        }
    }
}
