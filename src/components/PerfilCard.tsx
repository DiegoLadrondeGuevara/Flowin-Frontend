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
  <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] p-10" style={style}>
    {children}
  </div>
);

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-blue-600/30 border border-blue-500/50 text-blue-200 rounded-xl px-5 py-2 mx-2 my-2 font-semibold text-lg shadow-inner inline-block">
    {children}
  </span>
);

const IconTitle: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <div className="flex items-center gap-3 font-bold text-2xl mb-4 text-blue-300">
    {icon}
    {children}
  </div>
);

const PerfilHeader: React.FC<PerfilHeaderProps> = ({ username, mail, fotoUrl }) => (
  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 flex items-center justify-between mb-14 shadow-2xl relative overflow-hidden">
    <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] rounded-full pointer-events-none"></div>
    <div className="flex items-center gap-8 relative z-10">
      <img
        src={fotoUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(username) + "&background=1e293b&color=93c5fd"}
        alt="Foto de perfil"
        className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-slate-800"
      />
      <div>
        <div className="text-white font-black text-5xl tracking-tight drop-shadow-md">{username}</div>
        <div className="text-blue-200/80 font-medium text-xl mt-2 tracking-wide">{mail}</div>
      </div>
    </div>
    <button 
        onClick={() => window.location.href = "/seleccion-artistas"}
        className="relative z-10 bg-blue-600 hover:bg-blue-500 border border-blue-400/50 rounded-2xl px-8 py-4 font-bold text-xl text-white cursor-pointer flex items-center gap-3 shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> 
      Editar
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
        <div className="font-semibold mb-4 mt-8 text-xl text-blue-400 tracking-wide">
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