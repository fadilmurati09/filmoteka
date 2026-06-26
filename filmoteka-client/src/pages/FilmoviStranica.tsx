import React, { useEffect, useState } from 'react';

export default function FilmoviStranica() {
  const [filmovi, setFilmovi] = useState<any[]>([]);
  
  // States za pretragu i filtriranje
  const [search, setSearch] = useState('');
  const [izabraniZanr, setIzabraniZanr] = useState('Sve');
  const [izabranaGodina, setIzabranaGodina] = useState('');
  const [samoUBioskopima, setSamoUBioskopima] = useState(false);

  // States za paginaciju
  const [trenutnaStranica, setTrenutnaStranica] = useState(1);
  const filmovaPoStranici = 10;

  useEffect(() => {
    const sacuvaniFilmovi = JSON.parse(localStorage.getItem('filmovi') || '[]');
    setFilmovi(sacuvaniFilmovi);
  }, []);

  // Reset stranice na 1 ako se promene filteri
  useEffect(() => {
    setTrenutnaStranica(1);
  }, [search, izabraniZanr, izabranaGodina, samoUBioskopima]);

  //--- FILTRIRANJE ---
  const filtriraniFilmovi = filmovi.filter((film) => {
    const poklapaNaslov = film.naziv.toLowerCase().includes(search.toLowerCase());
    const prolaziPretragu = poklapaNaslov;

    const prolaziZanr = izabraniZanr === 'Sve' || film.zanr === izabraniZanr;
    const prolaziGodinu = izabranaGodina === '' || film.godina.toString() === izabranaGodina;

    // Popravljeno: Prikazuje stare filmove (undefined) ILI čekirane filmove kad je filter uključen
    const prolaziBioskop = !samoUBioskopima || film.uBioskopu === true || film.uBioskopu === undefined;

    return prolaziPretragu && prolaziZanr && prolaziGodinu && prolaziBioskop;
  });

  //--- PAGINACIJU ---
  const indeksPoslednjeg = trenutnaStranica * filmovaPoStranici;
  const indeksPrvog = indeksPoslednjeg - filmovaPoStranici;
  const trenutniPrikazFilmovi = filtriraniFilmovi.slice(indeksPrvog, indeksPoslednjeg);
  
  const ukupnoStranica = Math.ceil(filtriraniFilmovi.length / filmovaPoStranici);

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      <h2 style={{ color: '#1a1a1a', fontSize: '28px', fontWeight: '600', marginBottom: '10px', textAlign: 'center' }}>Filmoteka</h2>
      <p style={{ color: '#718096', textAlign: 'center', marginBottom: '30px' }}>Napredna pretraga i filtriranje filmova</p>
      
      {/* --- KONTROLNA TABLA --- */}
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 12px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <input 
            type="text" 
            placeholder="🔍 Ukucaj naslov za pretragu..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#64748b', marginBottom: '4px' }}>Žanr</label>
            <select value={izabraniZanr} onChange={(e) => setIzabraniZanr(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#fff' }}>
              <option value="Sve">Svi žanrovi</option>
              <option value="Drama">Drama</option>
              <option value="Akcija">Akcija</option>
              <option value="Komedija">Komedija</option>
              <option value="Horor">Horor</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#64748b', marginBottom: '4px' }}>Godina izdanja</label>
            <input 
              type="number" 
              placeholder="Sve godine" 
              value={izabranaGodina} 
              onChange={(e) => setIzabranaGodina(e.target.value)} 
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
            <input 
              type="checkbox" 
              id="bioskop" 
              checked={samoUBioskopima} 
              onChange={(e) => setSamoUBioskopima(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="bioskop" style={{ fontSize: '14px', fontWeight: '500', color: '#334155', cursor: 'pointer' }}>🎬 Samo u bioskopima</label>
          </div>
        </div>
      </div>

      {/* --- PRIKAZ FILMOVA --- */}
      {trenutniPrikazFilmovi.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#f7fafc', borderRadius: '12px', color: '#718096' }}>
          <p style={{ fontSize: '16px' }}>Nije pronađen nijedan film sa izabranim kriterijumima.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' }}>
            {trenutniPrikazFilmovi.map((film) => (
              <div key={film.id} style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 18px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px' }}>
                    {film.zanr}
                  </span>
                  {/* Značka ako je selektovano da je u bioskopu */}
                  {(film.uBioskopu === true || film.uBioskopu === undefined) && (
                    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: '600', padding: '4px 8px', borderRadius: '6px' }}>U Bioskopu</span>
                  )}
                </div>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: '600', color: '#1a1a1a' }}>{film.naziv}</h3>
                <hr style={{ border: 'none', borderTop: '1px solid #edf2f7', margin: '4px 0' }} />
                <div style={{ fontSize: '14px', color: '#4a5568', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{ margin: 0 }}><strong>Godina:</strong> <span style={{ color: '#1a1a1a' }}>{film.godina}</span></p>
                  <p style={{ margin: 0 }}><strong>Režiser:</strong> <span style={{ color: '#1a1a1a' }}>{film.reziser}</span></p>
                </div>
              </div>
            ))}
          </div>

          {/* --- PAGINACIJA --- */}
          {ukupnoStranica > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
              <button 
                disabled={trenutnaStranica === 1} 
                onClick={() => setTrenutnaStranica(prev => prev - 1)}
                style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: trenutnaStranica === 1 ? '#f1f5f9' : '#fff', cursor: trenutnaStranica === 1 ? 'not-allowed' : 'pointer', color: trenutnaStranica === 1 ? '#94a3b8' : '#334155', fontWeight: '500' }}
              >
                Prethodna
              </button>

              {Array.from({ length: ukupnoStranica }, (_, i) => i + 1).map((broj) => (
                <button
                  key={broj}
                  onClick={() => setTrenutnaStranica(broj)}
                  style={{ width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid', borderColor: trenutnaStranica === broj ? '#10b981' : '#cbd5e1', borderRadius: '6px', background: trenutnaStranica === broj ? '#10b981' : '#fff', color: trenutnaStranica === broj ? '#fff' : '#334155', fontWeight: '600', cursor: 'pointer' }}
                >
                  {broj}
                </button>
              ))}

              <button 
                disabled={trenutnaStranica === ukupnoStranica} 
                onClick={() => setTrenutnaStranica(prev => prev + 1)}
                style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: trenutnaStranica === ukupnoStranica ? '#f1f5f9' : '#fff', cursor: trenutnaStranica === ukupnoStranica ? 'not-allowed' : 'pointer', color: trenutnaStranica === ukupnoStranica ? '#94a3b8' : '#334155', fontWeight: '500' }}
              >
                Sledeća
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}