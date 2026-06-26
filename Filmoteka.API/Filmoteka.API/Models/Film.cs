namespace Filmoteka.API.Models
{
    public class Film
    {
        public int Id { get; set; }
        public string Naziv { get; set; } = string.Empty;
        public int Godina { get; set; }
        public int ZanrId { get; set; }
        public Zanr? Zanr { get; set; }
    }
}