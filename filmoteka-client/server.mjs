import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let filmovi = [];

// Ruta za uzimanje filmova
app.get('/api/filmovi', (req, res) => {
  res.json(filmovi);
});

// Ruta za dodavanje filma
app.post('/api/filmovi', (req, res) => {
  const noviFilm = { id: Date.now(), ...req.body };
  filmovi.push(noviFilm);
  res.status(201).json(noviFilm);
});

app.listen(5000, () => {
  console.log('Server radi na portu 5000!');
});