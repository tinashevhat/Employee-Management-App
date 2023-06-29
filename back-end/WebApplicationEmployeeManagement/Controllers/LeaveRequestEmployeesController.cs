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
    public class LeaveRequestEmployeesController : ControllerBase
    {
        private readonly masterContext _context;

        public LeaveRequestEmployeesController(masterContext context)
        {
            _context = context;
        }

        // GET: api/LeaveRequestEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveRequestEmployee>>> GetLeaveRequestEmployees()
        {
          if (_context.LeaveRequestEmployees == null)
          {
              return NotFound();
          }
            return await _context.LeaveRequestEmployees.ToListAsync();
        }

        // GET: api/LeaveRequestEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveRequestEmployee>> GetLeaveRequestEmployee(int id)
        {
          if (_context.LeaveRequestEmployees == null)
          {
              return NotFound();
          }
            var leaveRequestEmployee = await _context.LeaveRequestEmployees.FindAsync(id);

            if (leaveRequestEmployee == null)
            {
                return NotFound();
            }

            return leaveRequestEmployee;
        }

        // PUT: api/LeaveRequestEmployees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaveRequestEmployee(int id, LeaveRequestEmployee leaveRequestEmployee)
        {
            if (id != leaveRequestEmployee.LeaveRequestId)
            {
                return BadRequest();
            }

            _context.Entry(leaveRequestEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveRequestEmployeeExists(id))
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

        // POST: api/LeaveRequestEmployees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LeaveRequestEmployee>> PostLeaveRequestEmployee(LeaveRequestEmployee leaveRequestEmployee)
        {
          if (_context.LeaveRequestEmployees == null)
          {
              return Problem("Entity set 'masterContext.LeaveRequestEmployees'  is null.");
          }
            _context.LeaveRequestEmployees.Add(leaveRequestEmployee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LeaveRequestEmployeeExists(leaveRequestEmployee.LeaveRequestId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLeaveRequestEmployee", new { id = leaveRequestEmployee.LeaveRequestId }, leaveRequestEmployee);
        }

        // DELETE: api/LeaveRequestEmployees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaveRequestEmployee(int id)
        {
            if (_context.LeaveRequestEmployees == null)
            {
                return NotFound();
            }
            var leaveRequestEmployee = await _context.LeaveRequestEmployees.FindAsync(id);
            if (leaveRequestEmployee == null)
            {
                return NotFound();
            }

            _context.LeaveRequestEmployees.Remove(leaveRequestEmployee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeaveRequestEmployeeExists(int id)
        {
            return (_context.LeaveRequestEmployees?.Any(e => e.LeaveRequestId == id)).GetValueOrDefault();
        }
    }
}
