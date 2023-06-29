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
    public class ReportEmployeesController : ControllerBase
    {
        private readonly masterContext _context;

        public ReportEmployeesController(masterContext context)
        {
            _context = context;
        }

        // GET: api/ReportEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReportEmployee>>> GetReportEmployees()
        {
          if (_context.ReportEmployees == null)
          {
              return NotFound();
          }
            return await _context.ReportEmployees.ToListAsync();
        }

        // GET: api/ReportEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReportEmployee>> GetReportEmployee(int id)
        {
          if (_context.ReportEmployees == null)
          {
              return NotFound();
          }
            var reportEmployee = await _context.ReportEmployees.FindAsync(id);

            if (reportEmployee == null)
            {
                return NotFound();
            }

            return reportEmployee;
        }

        // PUT: api/ReportEmployees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReportEmployee(int id, ReportEmployee reportEmployee)
        {
            if (id != reportEmployee.ReportId)
            {
                return BadRequest();
            }

            _context.Entry(reportEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportEmployeeExists(id))
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

        // POST: api/ReportEmployees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReportEmployee>> PostReportEmployee(ReportEmployee reportEmployee)
        {
          if (_context.ReportEmployees == null)
          {
              return Problem("Entity set 'masterContext.ReportEmployees'  is null.");
          }
            _context.ReportEmployees.Add(reportEmployee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ReportEmployeeExists(reportEmployee.ReportId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetReportEmployee", new { id = reportEmployee.ReportId }, reportEmployee);
        }

        // DELETE: api/ReportEmployees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReportEmployee(int id)
        {
            if (_context.ReportEmployees == null)
            {
                return NotFound();
            }
            var reportEmployee = await _context.ReportEmployees.FindAsync(id);
            if (reportEmployee == null)
            {
                return NotFound();
            }

            _context.ReportEmployees.Remove(reportEmployee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReportEmployeeExists(int id)
        {
            return (_context.ReportEmployees?.Any(e => e.ReportId == id)).GetValueOrDefault();
        }
    }
}
