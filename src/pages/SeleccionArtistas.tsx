import React, { useState } from 'react';
import { actualizarArtistasFavoritos } from '../api';
import WindowPerfilOSala from '@/components/WindowPerfilOSala';

interface Artista {
  nombre: string;
  imagen: string;
}

const ARTISTAS: Artista[] = [
  { nombre: 'Queen', imagen: 'src/assets/perfiles/queen.jpg' },
  { nombre: 'Taylor Swift', imagen: 'src/assets/perfiles/taylor_swift.jpg' },
  { nombre: 'Bad Bunny', imagen: 'src/assets/perfiles/bad_bunny.jpg' },
  { nombre: 'The Beatles', imagen: 'src/assets/perfiles/the_beatles.jpg' },
  { nombre: 'Dua Lipa', imagen: 'src/assets/perfiles/dua_lipa.jpg' },
  { nombre: 'Post Malone', imagen: 'src/assets/perfiles/post_malone.jpg' },
];

const GENEROS = [
  'Rock', 'Pop', 'Jazz', 'Latina', 'Salsa',
  'Electrónica', 'Clásica', 'Indie', 'Trap',
  'Hip-Hop', 'Country', 'Metal'
];

const SeleccionArtistas: React.FC = () => {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVentana, setShowVentana] = useState(false);

  const toggleSeleccion = (nombre: string) => {
    setSeleccionados((prev) =>
      prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre]
    );
  };

  const toggleGenero = (genero: string) => {
    setGenerosSeleccionados((prev) =>
      prev.includes(genero) ? prev.filter((g) => g !== genero) : [...prev, genero]
    );
  };

  const handleContinuar = async () => {
    if (generosSeleccionados.length === 0) {
      setError('Selecciona al menos un género musical');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Puedes enviar ambos arrays si lo necesitas
      await actualizarArtistasFavoritos(seleccionados);
      // Aquí podrías guardar los géneros si tienes un endpoint para eso
      setShowVentana(true);
    } catch (err) {
      setError('Error al actualizar artistas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center py-16 font-poppins">
      <h1 className="text-5xl md:text-6xl font-bold mb-10 text-blue-900">Elige tus artistas favoritos</h1>
      <div className="flex flex-wrap gap-14 justify-center mb-10">
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

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Gustos musicales <span className="text-base text-gray-500">(elige al menos uno)</span></h2>
        <div className="flex flex-wrap gap-4">
          {GENEROS.map((genero) => (
            <button
              key={genero}
              type="button"
              onClick={() => toggleGenero(genero)}
              className={`px-6 py-2 rounded-full text-lg font-medium border-2 transition
                ${generosSeleccionados.includes(genero)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100'}
                ${loading ? 'opacity-60 pointer-events-none' : ''}
              `}
            >
              {genero}
            </button>
          ))}
        </div>
      </div>

      <button
        className="mt-4 px-16 py-5 rounded-2xl bg-blue-600 text-white font-bold text-2xl shadow-xl hover:bg-blue-700 transition disabled:opacity-60"
        onClick={handleContinuar}
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Continuar'}
      </button>
      <div className="my-4 justify-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <a href="/auth/login" className=" text-blue-600 hover:underline font-medium">
            Inicia sesión
          </a>
        </div>
      {error && <div className="mt-6 text-red-600 font-semibold text-xl">{error}</div>}
      {showVentana && <WindowPerfilOSala />}
    
    </div>
  );
};

export default SeleccionArtistas;