import React, { useEffect, useState } from "react";
import SalaCard from "../components/ui/SalaCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import FlowInLogo from "../components/FlowInLogo";
import { cancionesData } from "../pages/Sala"; // Ajusta la ruta si es necesario

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

  useEffect(() => {
  const fetchSalas = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sala/buscar`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("Salas recibidas:", data); // <-- Agrega esto
      setSalas(data);
    } catch {
      setSalas([]);
    }
  };
  fetchSalas();
}, []);

  const getArtista = (canciones: string[]) => {
    if (!canciones || canciones.length === 0) return "Desconocido";
    const cancion = cancionesData[canciones[0]];
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
  {salas.length === 0 && (
    <div className="text-gray-500 text-xl mt-12">No hay salas disponibles.</div>
  )}
  {salas.map((sala) => (
    <SalaCard
      key={sala.id}
      nombre={sala.nombre}
      personas={sala.usuariosConectados?.length || 0}
      genero={sala.genero?.[0] || "Sin género"}
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