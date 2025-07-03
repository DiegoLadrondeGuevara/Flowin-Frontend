import React from "react";
import ArtistasFavoritosCard from "./ArtistasFavoritosCard";

interface PerfilHeaderProps {
  username: string;
  mail: string;
  fotoUrl?: string;
}

export interface ArtistaFavorito {
  nombre: string;
  genero?: string;
  fotoUrl?: string;
  top?: boolean;
}

export interface UsuarioPerfil {
  username: string;
  mail: string;
  gustosMusicales: string[];
  artistasFavoritos: ArtistaFavorito[];
}

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-white rounded-3xl shadow-xl p-10" style={style}>
    {children}
  </div>
);

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-gradient-to-r from-blue-300 to-blue-400 text-white rounded-xl px-5 py-2 mx-2 my-2 font-semibold text-lg shadow inline-block">
    {children}
  </span>
);

const IconTitle: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <div className="flex items-center gap-3 font-bold text-2xl mb-4 text-blue-900">
    {icon}
    {children}
  </div>
);

const PerfilHeader: React.FC<PerfilHeaderProps> = ({ username, mail, fotoUrl }) => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-3xl p-10 flex items-center justify-between mb-14 shadow-xl">
    <div className="flex items-center gap-8">
      <img
        src={fotoUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(username)}
        alt="Foto de perfil"
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white"
      />
      <div>
        <div className="text-white font-bold text-4xl">{username}</div>
        <div className="text-blue-100 text-xl mt-2">{mail}</div>
      </div>
    </div>
    <button 
        onClick={() => window.location.href = "http://localhost:5173/seleccion-artistas"}
        className="bg-white hover:bg-blue-50 border-none rounded-xl px-8 py-4 font-semibold text-xl text-blue-700 cursor-pointer flex items-center gap-3 shadow transition">
      <span role="img" aria-label="Editar Gustos">✏️</span> Editar
    </button>
  </div>
);

const PerfilCard: React.FC<{ usuario: UsuarioPerfil }> = ({ usuario }) => (
  <div className="max-w-7xl mx-auto my-8 font-poppins drop-shadow-xl">
    <PerfilHeader username={usuario.username} mail={usuario.mail} />
    <div className="flex flex-col md:flex-row gap-16">
      <Card style={{ flex: 1 }}>
        <IconTitle icon={<span role="img" aria-label="music" className="text-3xl">🎵</span>}>
          Gustos Musicales
        </IconTitle>
        <div className="font-semibold mb-4 mt-8 text-xl text-blue-900">
          <span role="img" aria-label="headphones">🎧</span> GÉNEROS FAVORITOS
        </div>
        <div className="flex flex-wrap gap-2">
          {usuario.gustosMusicales.map((g) => <Tag key={g}>{g}</Tag>)}
        </div>
      </Card>
      <ArtistasFavoritosCard artistas={usuario.artistasFavoritos} />
    </div>
  </div>
);

export default PerfilCard;