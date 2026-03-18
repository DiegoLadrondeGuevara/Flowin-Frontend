import ListaCancionesModal from "../components/ListaCanciones";
import { useState, useMemo, useEffect } from "react";
import ModernAudioPlayer from "../components/ModernAudioPlayer";
import Navbar from "../components/Navbar";
import SalirSalaButton from "../components/SalirSalaButton";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { useMusicSync } from "../hooks/useMusicSync";
import { cancionesData, type Cancion } from "../data/cancionesData";

type UsuarioConectado = {
  id: number;
  username: string;
  tipo: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const cancionesDisponibles: Cancion[] = Object.entries(cancionesData).map(
  ([nombre, { url, artistas }]) => ({ nombre, url, artistas })
);

const obtenerCancion = (nombre: string): Cancion => ({
  nombre,
  url: cancionesData[nombre]?.url || "",
  artistas: cancionesData[nombre]?.artistas || [],
});

const Sala = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const state = useMemo(
    () =>
      (location.state as {
        nombre?: string;
        genero?: string[];
        artistas?: string;
        canciones?: string;
        salaId?: string | number;
        token?: string | null;
        usuariosConectados?: UsuarioConectado[];
        isHost?: boolean;
      }) || {},
    [location.state]
  );

  const token = state.token || localStorage.getItem("token") || "";
  const salaId = state.salaId?.toString() || params.id || "";
  const [salaNombre, setSalaNombre] = useState(state.nombre || "");
  const [artistas, setArtistas] = useState(state.artistas || "");
  const [cancionActual, setCancionActual] = useState<Cancion | null>(null);
  const [urlActual, setUrlActual] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [usuariosConectados, setUsuariosConectados] = useState<UsuarioConectado[]>(
    state.usuariosConectados || []
  );

  const isHost = state.isHost ?? true; // Default to host for now

  // Chat hook — auto-connects, appends single messages
  const { mensajes, sendMessage, status: chatStatus } = useChat(
    Number(salaId),
    token
  );

  // Music sync hook
  const {
    musicState,
    play: syncPlay,
    pause: syncPause,
    seek: syncSeek,
    changeTrack: syncChangeTrack,
  } = useMusicSync(Number(salaId), token, isHost);

  const [mensaje, setMensaje] = useState("");

  // Change current song (host action)
  const cambiarCancion = (nuevaUrl: string) => {
    setUrlActual(nuevaUrl);

    const cancionSeleccionada = cancionesDisponibles.find(
      (c) => c.url === nuevaUrl
    );

    if (cancionSeleccionada) {
      setCancionActual(cancionSeleccionada);
      setArtistas(cancionSeleccionada.artistas.join(", "));

      // Sync with other users
      if (isHost) {
        const idx = cancionesDisponibles.findIndex((c) => c.url === nuevaUrl);
        syncChangeTrack(
          cancionSeleccionada.nombre,
          cancionSeleccionada.url,
          idx
        );
      }
    }
  };

  // Sync music state from host (listeners only)
  useEffect(() => {
    if (isHost || !musicState?.songUrl) return;

    if (musicState.songUrl !== urlActual) {
      setUrlActual(musicState.songUrl);
      const cancion = cancionesDisponibles.find(
        (c) => c.url === musicState.songUrl
      );
      if (cancion) {
        setCancionActual(cancion);
        setArtistas(cancion.artistas.join(", "));
      }
    }
  }, [musicState, isHost, urlActual]);

  // Initialize from state or fetch from backend
  useEffect(() => {
    if (!token) {
      setError("No tienes sesión iniciada.");
      navigate("/auth/login");
      return;
    }

    if (state.canciones) {
      const cancionBackend = obtenerCancion(state.canciones);
      setCancionActual(cancionBackend);
      if (cancionBackend) {
        setUrlActual(cancionBackend.url);
        setArtistas(cancionBackend.artistas.join(", "));
      }
      setSalaNombre(state.nombre || "");
      setUsuariosConectados(state.usuariosConectados || []);
    } else if (salaId && token) {
      axios
        .get(`${BACKEND_URL}/sala/${salaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setSalaNombre(res.data.nombre || "");
          if (res.data.canciones) {
            const cancionBackend = obtenerCancion(res.data.canciones);
            setCancionActual(cancionBackend);
            if (cancionBackend) {
              setUrlActual(cancionBackend.url);
              setArtistas(cancionBackend.artistas.join(", "));
            }
          }
          setUsuariosConectados(res.data.usuariosConectados || []);
        })
        .catch(() => {
          setError("No se pudo cargar la sala.");
        });
    }
  }, [token, salaId, state, navigate]);

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;
    sendMessage(mensaje);
    setMensaje("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr_1fr] bg-slate-900">
        {/* LEFT: Player */}
        <div className="relative flex justify-center items-center p-8 min-h-[80vh] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-r border-slate-800">
          {/* subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-10 relative z-10">
            {urlActual ? (
              <>
                <div className="w-full text-center">
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-md mb-4 tracking-tight">
                    {cancionActual?.nombre || "Canción desconocida"}
                  </h2>
                  <p className="text-xl md:text-2xl text-blue-300 font-medium tracking-wide">
                    {cancionActual?.artistas.join(", ") || "Artista Desconocido"}
                  </p>
                </div>

                <div className="">
                  <ModernAudioPlayer
                    title={salaNombre || "Sala de Música"}
                    artist={artistas || "Artista Desconocido"}
                    audioSrc={urlActual}
                    isHost={isHost}
                    onPlay={(time) => syncPlay(time)}
                    onPause={(time) => syncPause(time)}
                    onSeeked={(time) => syncSeek(time)}
                    syncTime={musicState?.currentTime}
                    syncPlaying={musicState?.playing}
                  />
                </div>

                <button
                  className="mt-6 px-10 py-4 text-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white rounded-full font-bold shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_8px_32px_rgba(31,38,135,0.4)] transition-all duration-300"
                  onClick={() => setShowModal(true)}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
                    Elegir otra pista
                  </span>
                </button>

                {showModal && (
                  <ListaCancionesModal
                    canciones={cancionesDisponibles}
                    urlActual={urlActual}
                    onSelect={(c: Cancion) => cambiarCancion(c.url)}
                    onClose={() => setShowModal(false)}
                  />
                )}
              </>
            ) : (
              <div className="mt-10 text-white text-2xl bg-white/5 border border-white/10 px-12 py-10 rounded-3xl shadow-2xl backdrop-blur-md font-semibold text-center flex flex-col items-center gap-4">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
                No hay canciones sonando.
                <span className="text-base text-blue-200 mt-2 block font-normal">Escoge una del catálogo si eres el Host.</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Chat */}
        <div className="bg-slate-900 border-l border-slate-800 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Chat en Vivo
              </h3>
              {chatStatus && (
                <span className={`text-xs ${chatStatus.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                  {chatStatus}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold bg-blue-900/50 text-blue-300 px-3 py-1.5 rounded-full border border-blue-800/50 shadow-inner flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                {usuariosConectados.length}
              </span>
              <SalirSalaButton
                salaId={salaId}
                token={token}
                className="text-sm shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-3 pr-2 custom-scrollbar">
            {mensajes.length === 0 && !error && (
              <div className="text-center text-slate-500 mt-12 flex flex-col items-center gap-3">
                <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                ¡Sé el primero en escribir!
              </div>
            )}
            {mensajes.map((m, i) => (
              <div
                key={i}
                className="bg-slate-800/80 p-3.5 rounded-2xl rounded-tl-sm border border-slate-700/50 shadow-sm w-fit max-w-[90%]"
              >
                <span className="font-bold text-blue-400 text-sm block mb-0.5">
                  {m.username}
                </span>
                <span className="text-slate-200 text-sm">{m.contenido}</span>
              </div>
            ))}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg border border-red-200">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Message input */}
          <div className="flex gap-3 mt-auto bg-slate-800/50 p-2 rounded-2xl border border-slate-700/50">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe algo chill..."
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-slate-400 focus:outline-none transition-all duration-200"
              onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
            />
            <button
              onClick={enviarMensaje}
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 px-6 rounded-xl font-bold shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all shrink-0 flex items-center justify-center"
            >
              <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
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
};

export default Sala;