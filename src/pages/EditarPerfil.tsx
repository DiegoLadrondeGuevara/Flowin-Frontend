import React, { useState } from 'react';
import { actualizarArtistasFavoritos } from '../api';
import WindowPerfilOSala from '@/components/WindowPerfilOSala';

interface Artista {
  nombre: string;
  imagen: string;
}

const BASE_IMG_URL = import.meta.env.VITE_S3_IMAGES_URL || "https://flowin-20.s3.us-east-1.amazonaws.com/perfiles";

const ARTISTAS: Artista[] = [
  { nombre: 'Milo J', imagen: `${BASE_IMG_URL}/milo_j.jpg` },
  { nombre: 'Queen', imagen: `${BASE_IMG_URL}/queen.jpg` },
  { nombre: 'AC/DC', imagen: `${BASE_IMG_URL}/acdc.jpg` },
  { nombre: 'Red Hot Chili Peppers', imagen: `${BASE_IMG_URL}/red_hot_chili_peppers.jpg` },
  { nombre: 'Post Malone', imagen: `${BASE_IMG_URL}/post_malone.jpg` },
  { nombre: 'Ludwig van Beethoven', imagen: `${BASE_IMG_URL}/beethoven.jpg` },
  { nombre: 'Wolfgang Amadeus Mozart', imagen: `${BASE_IMG_URL}/mozart.jpg` },
  { nombre: 'Avicii', imagen: `${BASE_IMG_URL}/avicii.jpg` },
  { nombre: 'LMFAO', imagen: `${BASE_IMG_URL}/lmfao.jpg` },
  { nombre: 'Mi Novia❤️', imagen: `${BASE_IMG_URL}/novia.jpg` },
  { nombre: 'Dave Brubeck', imagen: `${BASE_IMG_URL}/dave_brubeck.jpg` },
  { nombre: 'Louis Armstrong', imagen: `${BASE_IMG_URL}/louis_armstrong.jpg` },
  { nombre: 'Daddy Yankee', imagen: `${BASE_IMG_URL}/daddy_yankee.jpg` },
  { nombre: 'Metallica', imagen: `${BASE_IMG_URL}/metallica.jpg` },
  { nombre: 'Lady Gaga', imagen: `${BASE_IMG_URL}/lady_gaga.jpg` },
  { nombre: 'Michael Jackson', imagen: `${BASE_IMG_URL}/michael_jackson.jpg` },
  { nombre: 'Oscar D\'León', imagen: `${BASE_IMG_URL}/oscar_dleon.jpg` },
  { nombre: 'Travis Scott', imagen: `${BASE_IMG_URL}/travis_scott.jpg` },
  { nombre: 'JACKBOYS', imagen: `${BASE_IMG_URL}/jackboys.jpg` },
];

const EditarPerfil: React.FC = () => {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVentana, setShowVentana] = useState(false);

  const toggleSeleccion = (nombre: string) => {
    setSeleccionados((prev) =>
      prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre]
    );
  };

  const handleContinuar = async () => {
    setLoading(true);
    setError(null);
    try {
      await actualizarArtistasFavoritos(seleccionados);
      setShowVentana(true); // Mostrar la ventanita
    } catch (err) {
      setError('Error al actualizar artistas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center py-16 font-poppins relative overflow-x-hidden">
      {/* Luces de fondo estilo neón */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <h1 className="text-5xl md:text-6xl font-black mb-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white drop-shadow-lg tracking-tight relative z-10 text-center px-4">
        Elige tus artistas favoritos
      </h1>
      <div className="flex flex-wrap gap-14 justify-center mb-14 relative z-10 max-w-7xl px-8">
        {ARTISTAS.map((artista) => (
          <div
            key={artista.nombre}
            onClick={() => toggleSeleccion(artista.nombre)}
            className={`w-56 h-80 md:w-64 md:h-96 rounded-3xl backdrop-blur-xl flex flex-col items-center justify-start cursor-pointer transition-all duration-300 border-2 shadow-[0_8px_32px_rgba(31,38,135,0.2)] group
              ${seleccionados.includes(artista.nombre)
                ? 'bg-blue-600/30 border-blue-400/80 shadow-[0_0_30px_rgba(96,165,250,0.5)] scale-105'
                : 'bg-slate-800/60 border-white/10 hover:border-blue-400/50 hover:bg-slate-800/80 hover:-translate-y-2'}
              ${loading ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <img
              src={artista.imagen}
              alt={artista.nombre}
              className={`w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover mt-8 shadow-2xl transition-all duration-300 border-2
                ${seleccionados.includes(artista.nombre) ? 'border-blue-300' : 'border-slate-700 group-hover:border-blue-400/50'}
              `}
            />
            <p className={`mt-8 text-2xl md:text-3xl font-bold text-center transition-colors duration-300
              ${seleccionados.includes(artista.nombre) ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-slate-300 group-hover:text-blue-100'}
            `}>
              {artista.nombre}
            </p>
          </div>
        ))}
      </div>
      <button
        className="relative z-10 mt-8 px-16 py-5 rounded-2xl bg-blue-600 font-bold text-2xl text-white shadow-[0_4px_24px_rgba(37,99,235,0.5)] hover:bg-blue-500 hover:shadow-[0_8px_32px_rgba(37,99,235,0.7)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
        onClick={handleContinuar}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-3">
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Guardando...
          </span>
        ) : (
          'Continuar al Perfil'
        )}
      </button>
      {error && <div className="relative z-10 mt-6 bg-red-900/40 border border-red-500/50 text-red-200 px-6 py-3 rounded-xl font-semibold text-xl backdrop-blur-sm">{error}</div>}
      {showVentana && <WindowPerfilOSala />}
    </div>
  );
};

export default EditarPerfil;