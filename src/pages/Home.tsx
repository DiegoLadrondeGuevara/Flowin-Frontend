import React, { useEffect, useState } from "react";
import SalaCard from "../components/ui/SalaCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import FlowInLogo from "../components/FlowInLogo";
import { cancionesData } from "../pages/Sala"; // Ajusta la ruta si es necesario
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
    <>
      <Navbar />
      <div className="min-h-screen bg-white p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <FlowInLogo className="mx-auto mb-4" />
        </div>

        <div className="max-w-6xl mx-auto mb-6 text-left">
          <button
            onClick={() => navigate("/crear-sala")}
            className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-600 transition"
          >
            + Crear Sala
          </button>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {loading && (
            <div className="text-gray-500 text-xl mt-12">Cargando salas...</div>
          )}
          
          {error && (
            <div className="text-red-500 text-xl mt-12">
              Error: {error}
              <button
                onClick={() => window.location.reload()}
                className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Reintentar
              </button>
            </div>
          )}
          
          {!loading && !error && salas.length === 0 && (
            <div className="text-gray-500 text-xl mt-12">No hay salas disponibles.</div>
          )}
          
              {!loading && !error && salas.map((sala) => (
              <SalaCard
                key={sala.id}
                nombre={sala.nombre}
                personas={sala.usuariosConectados?.length || 0}
                genero={sala.genero && sala.genero.length > 0 ? sala.genero.join(", ") : "Sin género"}
                artista={getArtista(sala.canciones)}
                onEntrar={() => navigate(`/sala/${sala.id}`)}
              />
              ))}
        </div>
      </div>
    </>
  );
};

export default Home;