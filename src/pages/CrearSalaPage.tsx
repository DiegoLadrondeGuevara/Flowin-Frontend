import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

const CrearSalaPage: React.FC = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState<string>("");
  const [generos, setGeneros] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const cancionesDisponibles = [
  { nombre: "Bohemian Rhapsody", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/queen/bohemianRapsody.mp3" },
  { nombre: "TNT", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/acdc/TNT.mp3" },
  { nombre: "Cant Stop", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/rock/rhcp/cantStop.mp3" },
  { nombre: "Missin You Like This", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/country/postMalone/missinYouLikeThis.mp3" },
  { nombre: "What Dont Belong To Me", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/country/postMalone/whatDontBelongToMe.mp3" },
  { nombre: "Ludwig No5 Op67", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/clasica/beethoven/ludwingNo5Op67.mp3" },
  { nombre: "Pequena Serenata Nocturna", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/clasica/mozart/peque%C3%B1aSerenataNocturna.mp3" },
  { nombre: "The Nights", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/avicii/theNights.mp3" },
  { nombre: "Waiting For Love", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/avicii/waitingForLove.mp3" },
  { nombre: "Party Rock Anthem", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/lmfao/electronica_lmfao_partyRockAnthem.mp3" },
  { nombre: "Sorry For Party Rock", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/electronica/lmfao/electronica_lmfao_sorryForPartyRockk.mp3" },
  { nombre: "Take Five", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/jazz/daveBrubeck/jazz_daveBrubeck_takeFive.mp3" },
  { nombre: "What A Wonderful World", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/jazz/louisArmstrong/jazz_louisArmstrong_whatAWonderfulWorld.mp3" },
  { nombre: "Limbo", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/latina/daddyYankee/latina_daddyYankee_Limbo.mp3" },
  { nombre: "Enter Sandman", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/enterSandman.mp3" },
  { nombre: "Master Of Puppets", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/masteroffpuppets.mp3" },
  { nombre: "Wherever I May Roam", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/metal/metallica/whereverIMayRoam.mp3" },
  { nombre: "Judas", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/pop/ladyGaga/judas.mp3" },
  { nombre: "Billie Jean", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/pop/michaelJackson/billieJean.mp3" },
  { nombre: "Lloraras", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/salsa/dLeon/Lloraras.mp3" },
  { nombre: "Goosebumps", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/trap/trap_travisScott_goosebumps.mp3" },
  { nombre: "Out West", url: "https://flowin2-music-bucket.s3.us-east-1.amazonaws.com/trap/trap_travisScottANDjackboys_outwest.mp3" },
];

  const [cancionSeleccionada, setCancionSeleccionada] = useState<string>("");

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
      const payload = {
        nombre,
        genero: generos,
        canciones: cancionSeleccionada || "", // Enviar como string, no como array
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
  <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-400 flex flex-col items-center justify-center">
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Crear Sala</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-blue-700 mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-blue-700 mb-1">Géneros (separados por coma)</label>
          <input
            type="text"
            value={generos.join(", ")}
            onChange={handleGeneroChange}
            className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: pop, rock, jazz"
          />
        </div>
        <div>
          <label className="block font-semibold text-blue-700 mb-1">Canción (elige una para empezar :D)</label>
          <div className="max-h-48 overflow-y-auto border border-blue-200 rounded-lg p-3 bg-blue-50">
            {cancionesDisponibles.map((cancion) => (
              <label key={cancion.url} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="cancion"
                  value={cancion.nombre}
                  checked={cancionSeleccionada === cancion.nombre}
                  onChange={() => setCancionSeleccionada(cancion.nombre)}
                  className="accent-blue-600"
                />
                <span className="ml-3 text-blue-900 font-medium">{cancion.nombre}</span>
              </label>
            ))}
            {!cancionSeleccionada && (
              <div className="text-blue-600 font-semibold mt-2 text-center">
                Escoge una canción para empezar :)
              </div>
            )}
          </div>
        </div>
        {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
        {mensaje && <div className="text-green-600 font-semibold text-center">{mensaje}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow transition-all"
        >
          Crear Sala
        </button>
      </form>
    </div>
  </div>
);
}

export default CrearSalaPage;