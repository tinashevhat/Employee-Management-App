using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationEmployeeManagement.Models;

namespace WebApplicationEmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsEmployeesController : ControllerBase
    {
        private readonly masterContext _context;

        public DetailsEmployeesController(masterContext context)
        {
            _context = context;
        }

        // GET: api/DetailsEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailsEmployee>>> GetDetailsEmployees()
        {
          if (_context.DetailsEmployees == null)
          {
              return NotFound();
          }
            return await _context.DetailsEmployees.ToListAsync();
        }

        // GET: api/DetailsEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetailsEmployee>> GetDetailsEmployee(int id)
        {
          if (_context.DetailsEmployees == null)
          {
              return NotFound();
          }
            var detailsEmployee = await _context.DetailsEmployees.FindAsync(id);

            if (detailsEmployee == null)
            {
                return NotFound();
            }

            return detailsEmployee;
        }

        // PUT: api/DetailsEmployees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetailsEmployee(int id, DetailsEmployee detailsEmployee)
        {
            if (id != detailsEmployee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(detailsEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetailsEmployeeExists(id))
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

        // POST: api/DetailsEmployees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DetailsEmployee>> PostDetailsEmployee(DetailsEmployee detailsEmployee)
        {
          if (_context.DetailsEmployees == null)
          {
              return Problem("Entity set 'masterContext.DetailsEmployees'  is null.");
          }
            _context.DetailsEmployees.Add(detailsEmployee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DetailsEmployeeExists(detailsEmployee.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDetailsEmployee", new { id = detailsEmployee.EmployeeId }, detailsEmployee);
        }

        // DELETE: api/DetailsEmployees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetailsEmployee(int id)
        {
            if (_context.DetailsEmployees == null)
            {
                return NotFound();
            }
            var detailsEmployee = await _context.DetailsEmployees.FindAsync(id);
            if (detailsEmployee == null)
            {
                return NotFound();
            }

            _context.DetailsEmployees.Remove(detailsEmployee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetailsEmployeeExists(int id)
        {
            return (_context.DetailsEmployees?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}
