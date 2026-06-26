import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FilmoviStranica from './pages/FilmoviStranica';
import DodajFilmStranica from './pages/DodajFilmStranica';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <nav style={{ padding: '15px', background: '#f4f4f4', marginBottom: '20px', borderRadius: '5px', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>🎬 Lista Filmova</Link>
          <Link to="/dodaj" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>➕ Dodaj Novi Film</Link>
        </nav>

        <Routes>
          <Route path="/" element={<FilmoviStranica />} />
          <Route path="/dodaj" element={<DodajFilmStranica />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;