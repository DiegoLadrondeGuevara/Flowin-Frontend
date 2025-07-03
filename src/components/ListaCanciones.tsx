import React from "react";
import type { Cancion } from "../pages/Sala";

type Props = {
  canciones: Cancion[];
  onSelect: (c: Cancion) => void;
  onClose: () => void;
  urlActual: string;
};

const ListaCancionesModal: React.FC<Props> = ({ canciones, onSelect, onClose, urlActual }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="bg-white rounded-xl shadow-2xl max-h-[80vh] w-full max-w-lg p-6 overflow-y-auto pointer-events-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700">Todas las canciones</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-lg">✕</button>
      </div>
      <ul>
        {canciones.map((c) => (
          <li key={c.nombre} className="mb-2">
            <button
              onClick={() => { onSelect(c); onClose(); }}
              className={`w-full text-left px-3 py-2 rounded ${
                urlActual === c.url
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {c.nombre}
              <span className="block text-xs text-gray-500">{c.artistas.join(", ")}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ListaCancionesModal;