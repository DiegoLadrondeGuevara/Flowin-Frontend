import React, { useEffect, useState } from "react";
import SalaCard from "../components/ui/SalaCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import FlowInLogo from "../components/FlowInLogo";
import { cancionesData } from "../data/cancionesData";
import { obtenerSalas } from "../api";

interface SalaApi {
  id: number;
  nombre: string;
  genero: string[];
  canciones: string[];
  artista: string | null;
  usuariosConectados: string[]; // Replace 'string' with a more specific type if needed
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [salas, setSalas] = useState<SalaApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await obtenerSalas();
        console.log("Salas recibidas:", data);
        setSalas(data);
      } catch (err) {
        console.error("Error al obtener salas:", err);
        
        // Si es un error 403 o de conexión, navegar a la página de error
        if (err instanceof Error) {
          if (err.message.includes('403') || err.message.includes('connection:')) {
            navigate('/error', {
              state: {
                errorType: err.message.includes('403') ? 'forbidden' : 'connection',
                message: err.message,
                statusCode: err.message.includes('403') ? 403 : undefined,
              },
            });
            return; // No mostrar error local, navegar a página de error
          }
        }
        
        // Para otros errores, mostrar error local
        setError(err instanceof Error ? err.message : "Error al cargar las salas");
        setSalas([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalas();
  }, [navigate]); // Solo navigate como dependencia

  const getArtista = (canciones: string[]) => {
    if (!canciones || canciones.length === 0) return "Desconocido";
    // Usar la última canción añadida (última en el array)
    const ultimaCancion = canciones[canciones.length - 1];
    const cancion = cancionesData[ultimaCancion];
    return cancion?.artistas?.join(", ") || "Desconocido";
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col overflow-x-hidden text-white font-sans relative">
      <Navbar />
      {/* Luces de fondo estilo neón suave */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="flex-1 p-8 pt-12 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <FlowInLogo className="mx-auto mb-4" />
        </div>

        <div className="w-full max-w-6xl mx-auto mb-10 text-left flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white hidden md:block tracking-tight drop-shadow-lg">
            Explora las Salas en Vivo
          </h1>
          <button
            onClick={() => navigate("/crear-sala")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Crear Sala
          </button>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto w-full">
          {loading && (
            <div className="text-blue-300 text-2xl mt-20 animate-pulse font-semibold flex flex-col items-center gap-4">
              <svg className="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Conectando con el Flow...
            </div>
          )}
          
          {error && (
            <div className="text-red-400 bg-red-900/20 border border-red-800/50 p-6 rounded-2xl text-xl mt-12 flex flex-col items-center gap-4 shadow-lg backdrop-blur-sm">
              <span className="font-bold">Error de Conexión</span>
              <span className="text-sm opacity-80 text-center max-w-md">{error}</span>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-white/10 border border-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/20 transition-all font-semibold"
              >
                📡 Reintentar
              </button>
            </div>
          )}
          
          {!loading && !error && salas.length === 0 && (
            <div className="text-blue-200/60 bg-white/5 border border-white/10 p-12 rounded-3xl text-2xl mt-16 flex flex-col items-center gap-6 shadow-2xl backdrop-blur-md">
              <svg className="w-20 h-20 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <span>El silencio invade FlowIn...</span>
              <span className="text-sm text-blue-300">¡Sé el primero en Crear una Sala y poner la música!</span>
            </div>
          )}
          
              {!loading && !error && salas.map((sala) => (
              <SalaCard
                key={sala.id}
                nombre={sala.nombre}
                personas={sala.usuariosConectados?.length || 0}
                genero={sala.genero && sala.genero.length > 0 ? sala.genero.join(", ") : "Sin género"}
                artista={getArtista(sala.canciones)}
                onEntrar={() => navigate(`/sala/${sala.id}`, { state: { isHost: false } })}
              />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;