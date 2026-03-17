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
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        {/* LEFT: Player */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-400 flex justify-center items-center p-8 border-r-4 border-white min-h-[80vh]">
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-10">
            {urlActual ? (
              <>
                <div className="w-full text-center">
                  <h2 className="text-5xl font-extrabold text-white drop-shadow mb-3">
                    {cancionActual?.nombre || "Canción desconocida"}
                  </h2>
                  <p className="text-2xl text-blue-100 font-semibold mb-6">
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
                  className="mt-6 px-8 py-3 text-lg bg-blue-700 text-white rounded-2xl font-semibold shadow hover:bg-blue-800 transition"
                  onClick={() => setShowModal(true)}
                >
                  Ver todas las canciones
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
              <div className="mt-10 text-white text-2xl bg-blue-700/60 px-10 py-8 rounded-2xl shadow font-semibold">
                No hay canciones en esta sala.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Chat */}
        <div className="bg-white p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-600">
                Chat en Vivo
              </h3>
              {chatStatus && (
                <span className={`text-xs ${chatStatus.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                  {chatStatus}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                👥 {usuariosConectados.length}
              </span>
              <SalirSalaButton
                salaId={salaId}
                token={token}
                className="text-sm"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {mensajes.length === 0 && !error && (
              <div className="text-center text-gray-500 mt-8">
                ¡El chat está esperando por ti!
              </div>
            )}
            {mensajes.map((m, i) => (
              <div
                key={i}
                className="bg-gray-100 p-3 rounded-lg border border-gray-200"
              >
                <span className="font-bold text-blue-600">
                  {m.username}:
                </span>{" "}
                <span className="text-gray-700 ml-1">{m.contenido}</span>
              </div>
            ))}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg border border-red-200">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Message input */}
          <div className="flex gap-3 mt-auto">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe algo..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
            />
            <button
              onClick={enviarMensaje}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sala;