using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemberManagement.Server.Data;
using MemberManagement.Shared;

namespace MemberManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly MemberManagementDbContext _context;

        public PersonController(MemberManagementDbContext context)
        {
            _context = context;
        }

        // GET: api/Person
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
        {
            if (_context.Persons == null)
            {
                return NotFound();
            }
            return await _context.Persons.Select(p => new Person
            {
                PersonId = p.PersonId,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Street = p.Street,
                HouseNumber = p.HouseNumber,
                Postcode = p.Postcode,
                City = p.City,
                Email = p.Email,
                DateOfBirth = p.DateOfBirth,
                JoinedAt = p.JoinedAt,
                ExitedAt = p.ExitedAt,
                PaysCash = p.PaysCash,
                IsStudent = p.IsStudent,
                IsPensioner = p.IsPensioner,
                DepartmentsTraining = p.DepartmentsTraining.Select(dp => new Department { DepartmentId = dp.DepartmentId, Name = dp.Name }).ToList(),
                DepartmentsParticipating = p.DepartmentsParticipating.Select(dp => new Department { DepartmentId = dp.DepartmentId, Name = dp.Name }).ToList()
            }).ToListAsync();
        }

        // GET: api/Person/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            if (_context.Persons == null)
            {
                return NotFound();
            }
            Person? person = await _context.Persons.Select(p => new Person
            {
                PersonId = p.PersonId,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Street = p.Street,
                HouseNumber = p.HouseNumber,
                Postcode = p.Postcode,
                City = p.City,
                Email = p.Email,
                DateOfBirth = p.DateOfBirth,
                JoinedAt = p.JoinedAt,
                ExitedAt = p.ExitedAt,
                PaysCash = p.PaysCash,
                IsStudent = p.IsStudent,
                IsPensioner = p.IsPensioner,
                DepartmentsTraining = p.DepartmentsTraining.Select(dp => new Department { DepartmentId = dp.DepartmentId, Name = dp.Name }).ToList(),
                DepartmentsParticipating = p.DepartmentsParticipating.Select(dp => new Department { DepartmentId = dp.DepartmentId, Name = dp.Name }).ToList()
            }).FirstOrDefaultAsync(p => p.PersonId == id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        // PUT: api/Person/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(int id, Person person)
        {
            if (id != person.PersonId)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Person
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            if (_context.Persons == null)
            {
                return Problem("Entity set 'MemberManagementDbContext.Persons'  is null.");
            }
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPerson), new { id = person.PersonId }, person);
        }

        // DELETE: api/Person/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            if (_context.Persons == null)
            {
                return NotFound();
            }
            var person = await _context.Persons.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonExists(int id)
        {
            return (_context.Persons?.Any(e => e.PersonId == id)).GetValueOrDefault();
        }
    }
}
