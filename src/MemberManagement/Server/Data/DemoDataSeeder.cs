namespace MemberManagement.Server.Data
{
    public class DemoDataSeeder
    {
        private MemberManagementDbContext Context;

        public DemoDataSeeder(MemberManagementDbContext context)
        {
            Context = context;
        }

        public void ClearDatabase()
        {
            Context.Persons.RemoveRange(Context.Persons.ToList());
            Context.Departments.RemoveRange(Context.Departments.ToList());
            Context.SaveChanges();
        }

        public void AddDemoData()
        {
            var homer = new Person { PersonId = 1, FirstName = "Homer", LastName = "Simpson", Street = "Evergreen Terrace", HouseNumber = "742", Postcode = 97475, City = "Springfield", Email = "hsimpson@powerplant.org", DateOfBirth = new DateTime(1984, 10, 10), JoinedAt = new DateTime(1990, 9, 4) };
            var marge = new Person { PersonId = 2, FirstName = "Marge", LastName = "Simpson", Street = "Evergreen Terrace", HouseNumber = "742", Postcode = 97475, City = "Springfield", DateOfBirth = new DateTime(1987, 7, 8), JoinedAt = new DateTime(1997, 3, 15)};
            var bart = new Person { PersonId = 3, FirstName = "Bartholomew", LastName = "Simpson", Street = "Evergreen Terrace", HouseNumber = "742", Postcode = 97475, City = "Springfield", Email = "evilboy@aol.com", DateOfBirth = new DateTime(2012, 04, 02), JoinedAt = new DateTime(2017, 6, 7), IsStudent = true};
            var lisa = new Person { PersonId = 4, FirstName = "Lisa", LastName = "Simpson", Street = "Evergreen Terrace", HouseNumber = "742", Postcode = 97475, City = "Springfield", Email = "lisa@jazzbase.com", DateOfBirth = new DateTime(2014, 8, 2), JoinedAt = new DateTime(2017, 6, 7), IsStudent = true};
            var maggie = new Person { PersonId = 5, FirstName = "Maggie", LastName = "Simpson", Street = "Evergreen Terrace", HouseNumber = "742", Postcode = 97475, City = "Springfield", DateOfBirth = new DateTime(2023, 1, 26), JoinedAt = new DateTime(2023, 1, 26), IsStudent = true };
            var klaus = new Person { PersonId = 6, FirstName = "Klaus-Michael", LastName = "Schröer", Street = "Rosenweg", HouseNumber = "4689", Postcode = 19947, City = "Parchim", DateOfBirth = new DateTime(1978, 7, 28), JoinedAt = new DateTime(2005, 7, 25) };
            var hilko = new Person { PersonId = 7, FirstName = "Hilko", LastName = "Arkema", Street = "De Voorstenkamp", HouseNumber = "7044", Postcode = 98270, City = "Utrecht", Email = "hilko.arkema@yahoo.com", DateOfBirth = new DateTime(2014, 1, 2), JoinedAt = new DateTime(2019, 4, 15), IsStudent = true };
            var alejandra = new Person { PersonId = 8, FirstName = "Alejandra", LastName = "Caballero", Street = "Calle del Pez", HouseNumber = "1671", Postcode = 17812, City = "Málaga"};
            var vera = new Person { PersonId = 9, FirstName = "Vera", LastName = "Caballero", Street = "Calle del Pez", HouseNumber = "1671", Postcode = 17812, City = "Málaga", DateOfBirth = new DateTime(2014, 12, 27), JoinedAt = new DateTime(2020, 10, 17), IsStudent = true };

            var fitness = new Department { DepartmentId = 1, Name = "Fitness" };
            var soccer = new Department { DepartmentId = 2, Name = "Soccer" };

            homer.AddDepartmentParticipation(fitness);
            homer.AddDepartmentParticipation(soccer);

            marge.AddDepartmentTraining(fitness);

            lisa.AddDepartmentParticipation(fitness);

            bart.AddDepartmentParticipation(soccer);

            klaus.AddDepartmentTraining(soccer);
            klaus.AddDepartmentParticipation(soccer);

            hilko.AddDepartmentParticipation(soccer);

            vera.AddDepartmentParticipation(fitness);

            Context.AddRange(homer, marge, bart, lisa, maggie, klaus, hilko, alejandra, vera);
            Context.AddRange(fitness, soccer);

            Context.SaveChanges();
        }
    }
}
