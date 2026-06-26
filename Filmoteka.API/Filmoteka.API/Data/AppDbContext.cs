using Microsoft.EntityFrameworkCore;
using Filmoteka.API.Models;

namespace Filmoteka.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Film> Filmovi { get; set; }
        public DbSet<Zanr> Zanrovi { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Početni podaci (Seed) za žanrove
            modelBuilder.Entity<Zanr>().HasData(
                new Zanr { Id = 1, Naziv = "Akcija" },
                new Zanr { Id = 2, Naziv = "Sci-Fi" },
                new Zanr { Id = 3, Naziv = "Drama" }
            );

            // Početni podaci za Admina da bismo mogli odmah da se ulogujemo
            modelBuilder.Entity<Korisnik>().HasData(
                new Korisnik { Id = 1, KorisnickoIme = "admin", Lozinka = "admin123", Uloga = "Admin" }
            );
        }
    }
}