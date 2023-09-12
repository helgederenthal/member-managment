using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemberManagement.Server.Data;
using MemberManagement.Shared;

namespace MemberManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly MemberManagementDbContext _context;

        public DepartmentController(MemberManagementDbContext context)
        {
            _context = context;
        }

        // GET: api/Department
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }

            return await _context.Departments.ToListAsync();
        }

        // GET: api/Department/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDeparment(int id)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            var department = await _context.Departments.FindAsync(id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }

        // PUT: api/Department/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeparment(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
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

        // PUT: api/Department/5/addParticipant
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}/addParticipant")]
        public async Task<IActionResult> AddParticipant(int id, int personId)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(d => d.DepartmentId == id);
            if (department == null)
            {
                return NotFound($"Department with id \"{id}\" not found!");
            }

            var person = await _context.Persons.FirstOrDefaultAsync(p => p.PersonId == personId);
            if (person == null)
            {
                return NotFound($"Person with id \"{personId}\" not found!");
            }

            department.AddParticipant(person);
            _context.SaveChanges();

            return NoContent();
        }

        // POST: api/Deparment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(Department deparment)
        {
            if (_context.Departments == null)
            {
                return Problem("Entity set 'MemberManagementDbContext.Deparments'  is null.");
            }
            _context.Departments.Add(deparment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeparment", new { id = deparment.DepartmentId }, deparment);
        }

        // DELETE: api/Deparment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeparment(int id)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            var deparment = await _context.Departments.FindAsync(id);
            if (deparment == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(deparment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentExists(int id)
        {
            return (_context.Departments?.Any(e => e.DepartmentId == id)).GetValueOrDefault();
        }
    }
}
