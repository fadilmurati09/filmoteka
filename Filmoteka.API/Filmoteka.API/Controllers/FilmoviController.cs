using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Filmoteka.API.Data;
using Filmoteka.API.Models;

namespace Filmoteka.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmoviController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FilmoviController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Filmovi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Film>>> GetFilmovi()
        {
            return await _context.Filmovi.Include(f => f.Zanr).ToListAsync();
        }

        // POST: api/Filmovi
        [HttpPost]
        public async Task<ActionResult<Film>> PostFilm(Film film)
        {
            _context.Filmovi.Add(film);
            await _context.SaveChangesAsync();

            // Učitavamo i žanr da bi ga React odmah video lepo formatiranog
            await _context.Entry(film).Reference(f => f.Zanr).LoadAsync();

            return CreatedAtAction(nameof(GetFilmovi), new { id = film.Id }, film);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFilm(int id)
        {
            var film = await _context.Filmovi.FindAsync(id);
            if (film == null)
            {
                return NotFound();
            }

            _context.Filmovi.Remove(film);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}