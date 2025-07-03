import { useState } from 'react';
import AudioPlayer from '../components/AudioPlayer';

const canciones = [
  { nombre: "Bohemian_Rhapsody", artista: "Queen", url: "https://flowin2-music-bucket.s3.amazonaws.com/rock_queen_bohemianRapsody.mp3" },
  { nombre: "TNT", artista: "AC/DC", url: "https://flowin2-music-bucket.s3.amazonaws.com/rock_acdc_TNT.mp3" },
  { nombre: "Cant_Stop", artista: "RHCP", url: "https://flowin2-music-bucket.s3.amazonaws.com/rock_rhcp_cantStop.mp3" },
  { nombre: "Master_Of_Puppets", artista: "Metallica", url: "https://flowin2-music-bucket.s3.amazonaws.com/metal_metallica_masteroffpuppets.mp3" },
  { nombre: "Llorarás", artista: "Oscar D'León", url: "https://flowin2-music-bucket.s3.amazonaws.com/salsa_dLeon_Lloraras.mp3" },
  { nombre: "Limbo", artista: "Daddy Yankee", url: "https://flowin2-music-bucket.s3.amazonaws.com/latina_daddyYankee_Limbo.mp3" },
  { nombre: "Waiting_For_Love", artista: "Avicii", url: "https://flowin2-music-bucket.s3.amazonaws.com/electronica_avicii_waitingForLove.mp3" },
  { nombre: "Sorry_For_Party_Rock", artista: "LMFAO", url: "https://flowin2-music-bucket.s3.amazonaws.com/electronica_lmfao_sorryForPartyRockk.mp3" },
  { nombre: "Billie_Jean", artista: "Michael Jackson", url: "https://flowin2-music-bucket.s3.amazonaws.com/pop_michaelJackson_billieJean.mp3" },  
];

const ReproductorTest = () => {
  const [urlActual, setUrlActual] = useState<string>(canciones[0].url);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' }}>
      <h2>Reproductor de Música - Test</h2>
      <p>Selecciona una canción para reproducir:</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {canciones.map((cancion) => (
          <li key={cancion.url} style={{ margin: '8px 0' }}>
            <button
              onClick={() => setUrlActual(cancion.url)}
              style={{
                background: urlActual === cancion.url ? '#2563eb' : '#e5e7eb',
                color: urlActual === cancion.url ? 'white' : '#111',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {cancion.nombre}
            </button>
          </li>
        ))}
      </ul>

      <hr style={{ margin: '40px 0' }} />

      <AudioPlayer url={urlActual} />
    </div>
  );
};

export default ReproductorTest;