import React, { useState } from 'react';
import { actualizarArtistasFavoritos } from '../api';
import WindowPerfilOSala from '@/components/WindowPerfilOSala';

interface Artista {
  nombre: string;
  imagen: string;
}

const ARTISTAS: Artista[] = [
  { nombre: 'Queen', imagen: 'src/assets/perfiles/queen.jpg' },
  { nombre: 'AC/DC', imagen: 'src/assets/perfiles/acdc.jpg' },
  { nombre: 'Red Hot Chili Peppers', imagen: 'src/assets/perfiles/red_hot_chili_peppers.jpg' },
  { nombre: 'Post Malone', imagen: 'src/assets/perfiles/post_malone.jpg' },
  { nombre: 'Ludwig van Beethoven', imagen: 'src/assets/perfiles/beethoven.jpg' },
  { nombre: 'Wolfgang Amadeus Mozart', imagen: 'src/assets/perfiles/mozart.jpg' },
  { nombre: 'Avicii', imagen: 'src/assets/perfiles/avicii.jpg' },
  { nombre: 'LMFAO', imagen: 'src/assets/perfiles/lmfao.jpg' },
  { nombre: 'Dave Brubeck', imagen: 'src/assets/perfiles/dave_brubeck.jpg' },
  { nombre: 'Louis Armstrong', imagen: 'src/assets/perfiles/louis_armstrong.jpg' },
  { nombre: 'Daddy Yankee', imagen: 'src/assets/perfiles/daddy_yankee.jpg' },
  { nombre: 'Metallica', imagen: 'src/assets/perfiles/metallica.jpg' },
  { nombre: 'Lady Gaga', imagen: 'src/assets/perfiles/lady_gaga.jpg' },
  { nombre: 'Michael Jackson', imagen: 'src/assets/perfiles/michael_jackson.jpg' },
  { nombre: 'Oscar D\'León', imagen: 'src/assets/perfiles/oscar_dleon.jpg' },
  { nombre: 'Travis Scott', imagen: 'src/assets/perfiles/travis_scott.jpg' },
  { nombre: 'JACKBOYS', imagen: 'src/assets/perfiles/jackboys.jpg' },
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center py-16 font-poppins">
      <h1 className="text-5xl md:text-6xl font-bold mb-14 text-blue-900">Elige tus artistas favoritos</h1>
      <div className="flex flex-wrap gap-14 justify-center mb-14">
        {ARTISTAS.map((artista) => (
          <div
            key={artista.nombre}
            onClick={() => toggleSeleccion(artista.nombre)}
            className={`w-56 h-80 md:w-64 md:h-96 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-start cursor-pointer transition-all duration-200 border-4
              ${seleccionados.includes(artista.nombre)
                ? 'border-blue-500 ring-4 ring-blue-400'
                : 'border-transparent hover:border-blue-300'}
              ${loading ? 'opacity-60 pointer-events-none' : ''}
            `}
          >
            <img
              src={artista.imagen}
              alt={artista.nombre}
              className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover mt-8 shadow-lg"
            />
            <p className="mt-8 text-2xl md:text-3xl font-semibold text-blue-800 text-center">{artista.nombre}</p>
          </div>
        ))}
      </div>
      <button
        className="mt-8 px-16 py-5 rounded-2xl bg-blue-600 text-white font-bold text-2xl shadow-xl hover:bg-blue-700 transition disabled:opacity-60"
        onClick={handleContinuar}
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Continuar'}
      </button>
      {error && <div className="mt-6 text-red-600 font-semibold text-xl">{error}</div>}
      {showVentana && <WindowPerfilOSala />}
    </div>
  );
};

export default EditarPerfil;