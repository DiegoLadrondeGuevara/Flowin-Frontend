"use client"

import ListaCancionesModal from "../components/ListaCanciones";
import { useState, useRef, useEffect, useMemo } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";
import ModernAudioPlayer from "../components/ModernAudioPlayer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type UsuarioConectado = {
  id: number;
  username: string;
  tipo: string;
  [key: string]: unknown; // Si tienes más campos y quieres flexibilidad
};

type ChatMessage = {
  username: string;
  contenido: string;
};

export type Cancion = {
  nombre: string;
  url: string;
  artistas: string[];
};

export const cancionesData: Record<string, { url: string; artistas: string[] }> = {
  "Bohemian Rhapsody": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/queen/bohemianRapsody.mp3",
    artistas: ["Queen"],
  },
  "TNT": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/acdc/TNT.mp3",
    artistas: ["AC/DC"],
  },
  "Cant Stop": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/rhcp/cantStop.mp3",
    artistas: ["Red Hot Chili Peppers"],
  },
  "Missin You Like This": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/country/postMalone/missinYouLikeThis.mp3",
    artistas: ["Post Malone"],
  },
  "What Dont Belong To Me": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/country/postMalone/whatDontBelongToMe.mp3",
    artistas: ["Post Malone"],
  },
  "Ludwig No5 Op67": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/clasica/beethoven/ludwingNo5Op67.mp3",
    artistas: ["Ludwig van Beethoven"],
  },
  "Pequena Serenata Nocturna": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/clasica/mozart/peque%C3%B1aSerenataNocturna.mp3",
    artistas: ["Wolfgang Amadeus Mozart"],
  },
  "The Nights": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/avicii/theNights.mp3",
    artistas: ["Avicii"],
  },
  "Waiting For Love": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/avicii/waitingForLove.mp3",
    artistas: ["Avicii"],
  },
  "Party Rock Anthem": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/lmfao/electronica_lmfao_partyRockAnthem.mp3",
    artistas: ["LMFAO"],
  },
  "Sorry For Party Rock": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/lmfao/electronica_lmfao_sorryForPartyRockk.mp3",
    artistas: ["LMFAO"],
  },
  "Take Five": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/jazz/daveBrubeck/jazz_daveBrubeck_takeFive.mp3",
    artistas: ["Dave Brubeck"],
  },
  "What A Wonderful World": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/jazz/louisArmstrong/jazz_louisArmstrong_whatAWonderfulWorld.mp3",
    artistas: ["Louis Armstrong"],
  },
  "Limbo": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/latina/daddyYankee/latina_daddyYankee_Limbo.mp3",
    artistas: ["Daddy Yankee"],
  },
  "Enter Sandman": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/enterSandman.mp3",
    artistas: ["Metallica"],
  },
  "Master Of Puppets": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/masteroffpuppets.mp3",
    artistas: ["Metallica"],
  },
  "Wherever I May Roam": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/whereverIMayRoam.mp3",
    artistas: ["Metallica"],
  },
  "Judas": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/pop/ladyGaga/judas.mp3",
    artistas: ["Lady Gaga"],
  },
  "Billie Jean": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/pop/michaelJackson/billieJean.mp3",
    artistas: ["Michael Jackson"],
  },
  "Lloraras": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/salsa/dLeon/Lloraras.mp3",
    artistas: ["Oscar D'León"],
  },
  "Goosebumps": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/trap/trap_travisScott_goosebumps.mp3",
    artistas: ["Travis Scott"],
  },
  "Out West": {
    url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/trap/trap_travisScottANDjackboys_outwest.mp3",
    artistas: ["Travis Scott", "JACKBOYS"],
  },
};

const cancionesDisponibles: Cancion[] = Object.entries(cancionesData).map(
  ([nombre, { url, artistas }]) => ({
    nombre,
    url,
    artistas,
  })
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

  const state = useMemo(() => (
    location.state as {
      nombre?: string;
      genero?: string[];
      artistas?: string;
      canciones?: string[];
      salaId?: string | number;
      token?: string | null;
      usuariosConectados?: UsuarioConectado[];
    } || {}
  ), [location.state]);

  // Token: usa el del state o el de localStorage
  const [token, setToken] = useState(
    state.token || localStorage.getItem("token") || ""
  );
  const [salaId, setSalaId] = useState<string>(
    state.salaId?.toString() || params.id || ""
  );
  const [salaNombre, setSalaNombre] = useState(state.nombre || "");
  const [, setArtistas] = useState(state.artistas || "");  const [canciones, setCanciones] = useState<Cancion[]>([]);
  const [urlActual, setUrlActual] = useState<string>("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState("");
  const [mensajes, setMensajes] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [, setUsuariosConectados] = useState<UsuarioConectado[]>(state.usuariosConectados || []);


  const stompClientRef = useRef<Client | null>(null);

  // Inicializa canciones si vienen en el state, si no, pide la sala con token
useEffect(() => {
    if (!token) {
      setError("No tienes sesión iniciada.");
      navigate("/auth/login");
      return;
    }

    // Si vienes del POST (crear sala), usa los datos del state
    if (state.canciones && state.canciones.length > 0) {
      const cancionesBackend = state.canciones.map((nombre: string) => obtenerCancion(nombre));
      setCanciones(cancionesBackend);
      setUrlActual(cancionesBackend[0]?.url || "");
      setUrlActual(cancionesBackend[0]?.url || "");
      setSalaNombre(state.nombre || "");
      setArtistas(state.artistas || "");
      setUsuariosConectados(state.usuariosConectados || []);
    } else if (salaId && token) {
      // Si entras directo por URL, pide los datos al backend
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/sala/${salaId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setSalaNombre(res.data.nombre || "");
          setArtistas(res.data.artistas || "");
          const cancionesBackend = (res.data.canciones || []).map(
            (nombre: string) => obtenerCancion(nombre)
          );
          setCanciones(cancionesBackend);
          setUrlActual(cancionesBackend[0]?.url || "");
          setUsuariosConectados(res.data.usuariosConectados || []);
        })
        .catch(() => {
          setError("No se pudo cargar la sala.");
        });
    }
  }, [token, salaId, state, navigate]);

  // Chat
  const connect = () => {
    if (!token || !salaId) {
      alert("Token y Sala ID son requeridos");
      return;
    }

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${import.meta.env.VITE_BACKEND_URL}/ws-chat`),
      connectHeaders: {
        Authorization: token,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        setStatus("¡Conectado al chat!");
        setError(null);
        client.subscribe(`/topic/sala/${salaId}`, (message: IMessage) => {
          const newMessages: ChatMessage[] = JSON.parse(message.body);
          setMensajes(newMessages);
        });
        client.subscribe(`/topic/error/${salaId}`, (message: IMessage) => {
          setError(message.body);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
        setStatus("Error de conexión");
      },
      onWebSocketError: (event) => {
        console.error("WebSocket error:", event);
        setStatus("Error de WebSocket");
      },
    });

    stompClientRef.current = client;
    client.activate();
  };

  const enviarMensaje = () => {
    if (
      !mensaje ||
      !stompClientRef.current ||
      !stompClientRef.current.connected
    )
      return;

    const msg = {
      contenido: mensaje,
      salaId: Number.parseInt(salaId, 10),
    };

    stompClientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(msg),
      headers: { Authorization: token },
    });

    setMensaje("");
  };

  return (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
      {/* LEFT: Reproductor */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-400 flex justify-center items-center p-8 border-r-4 border-white min-h-[80vh]">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-10">
          {urlActual ? (
            <>
              {/* Nombre de la canción */}
              <div className="w-full text-center">
                <h2 className="text-5xl font-extrabold text-white drop-shadow mb-3">
                  {canciones.find((c) => c.url === urlActual)?.nombre ||
                    cancionesDisponibles.find((c) => c.url === urlActual)?.nombre ||
                    "Canción desconocida"}
                </h2>
                <p className="text-2xl text-blue-100 font-semibold mb-6">
                  {canciones.find((c) => c.url === urlActual)?.artistas.join(", ") ||
                    cancionesDisponibles.find((c) => c.url === urlActual)?.artistas.join(", ") ||
                    "Artista Desconocido"}
                </p>
              </div>

              {/* Reproductor grande */}
              <div className="">
                <ModernAudioPlayer
                  title={salaNombre || "Sala de Música"}
                  artist={
                    (canciones.find((c) => c.url === urlActual)?.artistas.join(", ") ||
                      cancionesDisponibles.find((c) => c.url === urlActual)?.artistas.join(", ") ||
                      "Artista Desconocido")
                  }
                  audioSrc={urlActual}
                />
              </div>

              {/* Botón para abrir el modal */}
              <button
                className="mt-6 px-8 py-3 text-lg bg-blue-700 text-white rounded-2xl font-semibold shadow hover:bg-blue-800 transition"
                onClick={() => setShowModal(true)}
              >
                Ver todas las canciones
              </button>

              {/* Lista de canciones actual */}
              <div className="w-full flex flex-col items-center mt-6">
                {canciones
                  .filter((c) => c.url === urlActual)
                  .map((c) => (
                    <div key={c.nombre} className="flex flex-col items-center">
                      <button
                        onClick={() => setUrlActual(c.url)}
                        className={`px-6 py-3 rounded-2xl text-lg font-bold shadow ${
                          urlActual === c.url
                            ? "bg-white text-blue-700 border-2 border-blue-700"
                            : "bg-blue-200 text-blue-900"
                        }`}
                      >
                        {c.nombre}
                      </button>
                      <div className="text-base text-blue-100 mt-2">
                        {c.artistas.join(", ")}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Modal de canciones */}
              {showModal && (
                <ListaCancionesModal
                  canciones={cancionesDisponibles}
                  urlActual={urlActual}
                  onSelect={(c: Cancion) => setUrlActual(c.url)}
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
        <h3 className="text-2xl font-bold text-blue-600 mb-6">
          Chat en Vivo
        </h3>

        {/* Configuración de conexión */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Token:
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="eyJhbGciOi..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              ID de la Sala:
            </label>
            <input
              type="number"
              value={salaId}
              onChange={(e) => setSalaId(e.target.value)}
              placeholder="Ej: 1"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
          </div>
          <button
            onClick={connect}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Conectar al Chat
          </button>
        </div>

        {/* Estado */}
        {status && (
          <div
            className={`p-3 rounded-xl font-medium mb-4 ${
              status.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {status}
          </div>
        )}

        {/* Mensajes */}
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

        {/* Input de mensaje */}
        <div className="flex gap-3 mt-auto">
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe algo..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            onKeyPress={(e) => e.key === "Enter" && enviarMensaje()}
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
}

export default Sala;