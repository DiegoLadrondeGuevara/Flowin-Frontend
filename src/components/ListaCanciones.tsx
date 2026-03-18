import React, { useState, useMemo } from "react";
import type { Cancion } from "../data/cancionesData";

type Props = {
  canciones: Cancion[];
  onSelect: (c: Cancion) => void;
  onRequest?: (c: Cancion) => void;
  onClose: () => void;
  urlActual: string;
  isHost?: boolean;
};

const ListaCancionesModal: React.FC<Props> = ({ canciones, onSelect, onRequest, onClose, urlActual, isHost = true }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const generosDisponibles = ["Rock", "Pop", "Jazz", "Latina", "Salsa", "Electrónica", "Clásica", "Indie", "Trap", "Hip-Hop", "Country", "Metal"];

  // Note: Cancion doesn't have a direct 'genero' array in some interfaces, but we can search artists or explicitly define it if needed. 
  // Assuming artists/nombre holds the key text for search.
  const filtradas = useMemo(() => {
    return canciones.filter(c => {
      const matchText = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.artistas.some((a: string) => a.toLowerCase().includes(searchTerm.toLowerCase()));
      // If we had genres in 'Cancion' type from 'cancionesData' we would filter it here too.
      return matchText;
    });
  }, [canciones, searchTerm, selectedGenre]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.4)] max-h-[85vh] w-full max-w-xl p-8 overflow-hidden pointer-events-auto flex flex-col relative">
        <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] rounded-full pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-2xl font-black text-white px-2">
            {isHost ? "🎵 Catálogo de Tracks" : "🎵 Pedir Canción al Host"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-10 h-10 rounded-full flex items-center justify-center transition-all">
            ✕
          </button>
        </div>

        <div className="mb-6 relative z-10 space-y-4 px-2">
          {/* Barra de búsqueda */}
          <div className="relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text"
              placeholder="Buscar por canción o artista..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium placeholder-slate-500 shadow-inner"
            />
          </div>

          {/* Filtro de Géneros (Visual/Mock por ahora si el backend no los trae en la canción) */}
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <button
              onClick={() => setSelectedGenre("")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${!selectedGenre ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700'}`}
            >
              Todos
            </button>
            {generosDisponibles.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${selectedGenre === g ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-700'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar relative z-10">
          {filtradas.length === 0 ? (
            <div className="text-center text-slate-500 py-10 font-medium">No se encontraron resultados.</div>
          ) : (
            filtradas.map((c) => (
              <li key={c.nombre}>
                <button
                  onClick={() => { 
                    if (isHost) onSelect(c); 
                    else if (onRequest) onRequest(c);
                    onClose(); 
                  }}
                  className={`w-full flex flex-col items-start px-5 py-3 rounded-xl transition-all border ${
                    urlActual === c.url
                      ? "bg-blue-600/20 border-blue-500/50 shadow-inner"
                      : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/80 hover:border-slate-600"
                  }`}
                >
                  <span className={`font-bold text-lg leading-tight ${urlActual === c.url ? 'text-blue-200' : 'text-slate-200'}`}>{c.nombre}</span>
                  <span className="text-sm text-slate-400 mt-1 font-medium">{c.artistas.join(", ")}</span>
                </button>
              </li>
            ))
          )}
        </ul>

      </div>
    </div>
  );
};

export default ListaCancionesModal;