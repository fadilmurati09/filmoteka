namespace Filmoteka.API.Models
{
    public class Zanr
    {
        public int Id { get; set; }
        public string Naziv { get; set; } = string.Empty;
        public List<Film> Filmovi { get; set; } = new();
    }
}