using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Filmoteka.API.Data;
using Filmoteka.API.Models;

namespace Filmoteka.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZanroviController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ZanroviController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Zanrovi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zanr>>> GetZanrovi()
        {
            return await _context.Zanrovi.ToListAsync();
        }
    }
}