import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { cancionesArray } from "../data/cancionesData";

const CrearSalaPage: React.FC = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState<string>("");
  const [generos, setGeneros] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const cancionesDisponibles = cancionesArray.map(c => ({
    nombre: c.nombre,
    url: c.url,
    artistas: c.artistas.join(", "),
    genero: c.genero
  }));

  const [cancionSeleccionada, setCancionSeleccionada] = useState<string>("");

  const cancionesDisponiblesFiltradas = useMemo(() => {
    const activeGenres = generos.filter(g => g.trim().length > 0);
    if (activeGenres.length === 0) return cancionesDisponibles;
    
    return cancionesDisponibles.filter(cancion => {
      // Filtrar si el nombre de la canción, URL o artista contiene el pedazo de texto
      return activeGenres.some(genero => {
        const query = genero.toLowerCase().trim();
        return cancion.nombre.toLowerCase().includes(query) || 
               cancion.artistas.toLowerCase().includes(query) ||
               (cancion.genero && cancion.genero.some(g => g.toLowerCase().includes(query)));
      });
    });
  }, [generos]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    if (!token) {
      setError("No tienes sesión iniciada. Por favor inicia sesión.");
      navigate("/auth/login");
      return;
    }

    // Verificar si el token parece válido (basic check)
    if (token.length < 10) {
      setError("Token de sesión inválido. Por favor inicia sesión nuevamente.");
      localStorage.removeItem("token");
      navigate("/auth/login");
      return;
    }

    // Validar que se haya seleccionado al menos una canción
    if (!cancionSeleccionada) {
      setError("Por favor selecciona una canción para crear la sala.");
      return;
    }

    try {
      const cancionInfo = cancionesDisponibles.find(c => c.nombre === cancionSeleccionada);
      const payload = {
        nombre,
        genero: generos.length > 0 && generos[0] !== "" ? generos : ["General"],
        artista: cancionInfo ? cancionInfo.artistas : "Varios Artistas",
        canciones: cancionSeleccionada ? [cancionSeleccionada] : [], 
      };
      
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sala`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensaje("Sala creada con éxito 🎉");
      navigate(`/sala/${res.data.id}`, {
        state: {
          ...res.data, // pasa toda la sala, incluyendo usuariosConectados y roles
          token,
        },
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      
      // Manejo específico para error 403
      if (error.response?.status === 403) {
        setError("Acceso denegado. Tu sesión puede haber expirado. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token");
        navigate("/auth/login");
        return;
      }
      
      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        JSON.stringify(error.response?.data) ||
        "Error al crear sala."
      );
    }
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneros(e.target.value.split(",").map((g) => g.trim()));
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center px-4 relative overflow-hidden font-poppins py-12">
    <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)] rounded-full pointer-events-none z-0"></div>
    <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] rounded-full pointer-events-none z-0"></div>
  
    <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.4)] p-10 relative z-10">
      <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white mb-8 text-center tracking-tight drop-shadow-md">Crear nueva Sala</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-blue-300 mb-2">Nombre de la Sala</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 transition-all font-medium"
            placeholder="Ej: Vibes Nocturnas"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-blue-300 mb-2">Géneros (Separados por coma para filtrar los temas)</label>
          <input
            type="text"
            value={generos.join(", ")}
            onChange={handleGeneroChange}
            className="w-full bg-slate-900/50 border border-slate-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 transition-all font-medium"
            placeholder="Ej: pop, rock (también puedes buscar por artista o canción)"
          />
        </div>
        <div>
          <label className="block font-semibold text-blue-300 mb-3">Canción Inicial</label>
          <div className="max-h-64 overflow-y-auto border border-slate-700/50 rounded-xl p-3 bg-slate-900/40 custom-scrollbar pr-2 space-y-2 relative shadow-inner">
            {cancionesDisponiblesFiltradas.length === 0 && (
              <div className="text-slate-500 font-medium text-center my-8">
                No se encontraron canciones para los géneros escritos.
              </div>
            )}
            {cancionesDisponiblesFiltradas.map((cancion) => (
              <label 
                key={cancion.url} 
                className={`flex flex-col items-start px-4 py-3 cursor-pointer rounded-lg border transition-all duration-200 ${
                  cancionSeleccionada === cancion.nombre 
                    ? "bg-blue-600/20 border-blue-500/50 shadow-inner" 
                    : "bg-slate-800/50 border-transparent hover:bg-slate-700/60"
                }`}
              >
                <div className="flex items-center w-full">
                  <input
                    type="radio"
                    name="cancion"
                    value={cancion.nombre}
                    checked={cancionSeleccionada === cancion.nombre}
                    onChange={() => {
                      setCancionSeleccionada(cancion.nombre);
                      if (cancion.genero && cancion.genero.length > 0) {
                        setGeneros(cancion.genero);
                      }
                    }}
                    className="accent-blue-500 w-4 h-4"
                  />
                  <div className="ml-4 flex flex-col">
                    <span className={`font-bold text-base leading-tight ${cancionSeleccionada === cancion.nombre ? "text-blue-300" : "text-white"}`}>
                      {cancion.nombre}
                    </span>
                    <span className="text-sm font-medium text-slate-400 mt-0.5">{cancion.artistas}</span>
                  </div>
                </div>
              </label>
            ))}
            {!cancionSeleccionada && cancionesDisponiblesFiltradas.length > 0 && (
              <div className="text-blue-400/80 font-medium mt-4 text-center">
                Escoge una canción para empezar :)
              </div>
            )}
          </div>
        </div>
        {error && <div className="bg-red-900/20 border border-red-800/50 text-red-400 font-semibold text-center p-4 rounded-xl">{error}</div>}
        {mensaje && <div className="bg-green-900/20 border border-green-800/50 text-green-400 font-semibold text-center p-4 rounded-xl">{mensaje}</div>}
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all mt-4 text-lg"
        >
          Crear Sala Mágica
        </button>
      </form>
    </div>
    <style>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(148, 163, 184, 0.2);
        border-radius: 20px;
      }
    `}</style>
  </div>
);
}

export default CrearSalaPage;