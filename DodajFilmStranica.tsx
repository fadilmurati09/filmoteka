import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DodajFilmStranica() {
  const [naziv, setNaziv] = useState('');
  const [godina, setGodina] = useState('');
  const [reziser, setReziser] = useState('');
  const [zanr, setZanr] = useState('Drama');
  const [uBioskopu, setUBioskopu] = useState(false); // Novo polje za dostupnost
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naziv || !godina || !reziser) {
      alert("Molimo popunite sva polja!");
      return;
    }

    const noviFilm = { 
      id: Date.now(), 
      naziv, 
      godina, 
      reziser, 
      zanr, 
      uBioskopu // Spasava se true ili false
    };

    const postojeci = JSON.parse(localStorage.getItem('filmovi') || '[]');
    postojeci.push(noviFilm);
    localStorage.setItem('filmovi', JSON.stringify(postojeci));

    alert("Film uspešno dodat!");
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', padding: '30px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      <h2 style={{ color: '#1a1a1a', marginBottom: '25px', fontSize: '24px', fontWeight: '600' }}>Dodaj Novi Film</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568', marginBottom: '6px' }}>Naziv filma</label>
          <input type="text" value={naziv} onChange={e => setNaziv(e.target.value)} placeholder="Npr. Inception" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568', marginBottom: '6px' }}>Godina izdanja</label>
          <input type="number" value={godina} onChange={e => setGodina(e.target.value)} placeholder="Npr. 2010" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568', marginBottom: '6px' }}>Režiser</label>
          <input type="text" value={reziser} onChange={e => setReziser(e.target.value)} placeholder="Npr. Christopher Nolan" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568', marginBottom: '6px' }}>Žanr</label>
          <select value={zanr} onChange={e => setZanr(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', background: '#fff', outline: 'none', boxSizing: 'border-box' }}>
            <option value="Drama">Drama</option>
            <option value="Akcija">Akcija</option>
            <option value="Komedija">Komedija</option>
            <option value="Horor">Horor</option>
          </select>
        </div>

        {/* Checkbox za Bioskop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
          <input 
            type="checkbox" 
            id="dodajBioskop" 
            checked={uBioskopu} 
            onChange={e => setUBioskopu(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
          />
          <label htmlFor="dodajBioskop" style={{ fontSize: '14px', fontWeight: '500', color: '#4a5568', cursor: 'pointer' }}>🎬 Ovaj film je trenutno u bioskopima</label>
        </div>

        <button type="submit" style={{ width: '100%', padding: '14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)', marginTop: '10px' }}>
          Sačuvaj Film
        </button>
      </form>
    </div>
  );
}