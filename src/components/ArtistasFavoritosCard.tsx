import React from "react";
import type { ArtistaFavorito } from "./PerfilCard";

const BASE_IMG_URL = import.meta.env.VITE_S3_IMAGES_URL || "https://flowin-20.s3.us-east-1.amazonaws.com/perfiles";

const getArtistaFoto = (nombre: string) => {
  if (nombre === "Mi Novia❤️" || nombre.toLowerCase().includes("novia")) return `${BASE_IMG_URL}/novia.jpg`;
  const fileName = `${nombre.replace(/\s+/g, "_").toLowerCase()}.jpg`;
  return `${BASE_IMG_URL}/${fileName}`;
};

const ArtistaFavoritoItem: React.FC<ArtistaFavorito> = ({ nombre, genero, fotoUrl, top }) => {
  const imgSrc = fotoUrl || getArtistaFoto(nombre) || `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}`;
  const [imgError, setImgError] = React.useState(false);

  return (
      <div className="relative group rounded-2xl overflow-hidden shadow-lg aspect-square border-2 border-slate-700 bg-slate-800 flex items-center justify-center transition-transform duration-300 group-hover:z-10 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
    {!imgError && (
      <img
        src={imgSrc}
        alt={nombre}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
        onError={e => {
          setImgError(true);
          (e.currentTarget as HTMLImageElement).src = "";
        }}
      />
    )}
    {/* Nombre y detalles */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="opacity-0 group-hover:opacity-100 text-white font-bold text-xl md:text-2xl transition-opacity duration-300">
        {nombre}
      </span>
      {top && (
        <span className="opacity-0 group-hover:opacity-100 mt-2 flex items-center gap-1 bg-yellow-100 text-yellow-700 rounded px-2 py-0.5 text-sm font-semibold transition-opacity duration-300">
          <span role="img" aria-label="star">⭐</span> Top
        </span>
      )}
      {genero && (
        <span className="opacity-0 group-hover:opacity-100 mt-2 text-blue-200 text-xs md:text-sm transition-opacity duration-300">
          {genero}
        </span>
      )}
    </div>
  </div>
  );
};

const ArtistasFavoritosCard: React.FC<{ artistas: ArtistaFavorito[] }> = ({ artistas }) => (
  <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] p-10 flex-1 flex flex-col relative overflow-hidden">
    <div className="absolute top-[-150px] right-[-150px] w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.12)_0%,_transparent_70%)] rounded-full pointer-events-none"></div>
    <div className="flex items-center gap-3 font-bold text-2xl mb-8 text-blue-300 relative z-10">
      <span role="img" aria-label="mic" className="text-3xl drop-shadow-md">🎤</span>
      Artistas Favoritos
    </div>
    {artistas.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-64 text-blue-400/60 relative z-10">
        <span className="text-6xl mb-4 opacity-50">🎵</span>
        <span className="font-semibold text-xl text-blue-200 text-center">¡Aún no tienes artistas favoritos!</span>
        <span className="text-sm text-blue-300/70 mt-2 text-center">Agrega tus favoritos para verlos aquí.</span>
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {artistas.map((a) => <ArtistaFavoritoItem key={a.nombre} {...a} />)}
      </div>
    )}
  </div>
);

export default ArtistasFavoritosCard;