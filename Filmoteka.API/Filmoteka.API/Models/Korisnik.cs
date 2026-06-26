namespace Filmoteka.API.Models
{
    public class Korisnik
    {
        public int Id { get; set; }
        public string KorisnickoIme { get; set; } = string.Empty;
        public string Lozinka { get; set; } = string.Empty;
        public string Uloga { get; set; } = "Korisnik"; // Admin ili Korisnik
    }
}