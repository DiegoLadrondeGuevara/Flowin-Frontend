import React from "react";
import { useNavigate } from "react-router-dom";

const WindowPerfilOSala: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 border-2 border-blue-200">
      <div className="text-2xl font-bold text-blue-800 mb-2">¿A dónde quieres ir?</div>
      <div className="flex gap-8">
        <button
          onClick={() => navigate("/home")}
          className="flex flex-col items-center bg-blue-100 hover:bg-blue-200 rounded-2xl px-8 py-6 shadow-lg transition text-blue-700 font-semibold text-xl"
        >
          <span className="text-5xl mb-2">🎧</span>
          Salas
        </button>
        <button
          onClick={() => navigate("/usuario/perfil")}
          className="flex flex-col items-center bg-blue-100 hover:bg-blue-200 rounded-2xl px-8 py-6 shadow-lg transition text-blue-700 font-semibold text-xl"
        >
          <span className="text-5xl mb-2">👤</span>
          Perfil
        </button>
      </div>
    </div>
  );
};

export default WindowPerfilOSala;