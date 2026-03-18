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