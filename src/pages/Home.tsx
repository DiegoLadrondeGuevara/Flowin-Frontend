import React from "react";
import SalaCard from "../components/ui/SalaCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import FlowInLogo from "../components/FlowInLogo";

interface Sala {
  id: string;
  nombre: string;
  personas: number;
  genero: string;
  artista: string;
}

const salas: Sala[] = [
  {
    id: "1",
    nombre: "Chill Vibes",
    personas: 32,
    genero: "Ambient",
    artista: "Various Artists",
  },
  {
    id: "2",
    nombre: "Latin Beats",
    personas: 56,
    genero: "Latin",
    artista: "Manu Chao",
  },
  {
    id: "3",
    nombre: "Electronic Room",
    personas: 21,
    genero: "Electronic",
    artista: "Daft Punk",
  },
  {
    id: "4",
    nombre: "Rock Classics",
    personas: 45,
    genero: "Rock",
    artista: "Queen",
  },
  {
    id: "5",
    nombre: "Jazz Lounge",
    personas: 18,
    genero: "Jazz",
    artista: "Miles Davis",
  },
  {
    id: "6",
    nombre: "Pop Hits",
    personas: 67,
    genero: "Pop",
    artista: "Taylor Swift",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleEntrar = (salaId: string) => {
    console.log(`Entrando a la sala ${salaId}`);
    // Navegar a la sala específica
    navigate(`/sala/${salaId}`);
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
          {salas.map((sala) => (
            <SalaCard
              key={sala.id}
              nombre={sala.nombre}
              personas={sala.personas}
              genero={sala.genero}
              artista={sala.artista}
              onEntrar={() => handleEntrar(sala.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;