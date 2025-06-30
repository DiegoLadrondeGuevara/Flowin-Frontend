import React, { useEffect, useState } from "react";
import PerfilCard from "../components/PerfilCard"; 
import type { UsuarioPerfil } from "../components/PerfilCard";
import type { ArtistaFavorito } from "../components/PerfilCard";
import Navbar from "@/components/Navbar";
import SalasButton from "@/components/SalasButton";
import FlowInLogo from "@/components/FlowInLogo";

const Perfil: React.FC = () => {
  const [usuario, setUsuario] = useState<UsuarioPerfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No autenticado");
          setLoading(false);
          return;
        }
        const res = await fetch("http://23.23.63.26:8080/usuario/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener perfil");
        const data = await res.json();

        const artistas: ArtistaFavorito[] = (data.artistasFavoritos || []).map((nombre: string) => ({
          nombre,
          genero: "", 
        }));

        setUsuario({
          username: data.username,
          mail: data.mail,
          gustosMusicales: data.gustosMusicales || [],
          artistasFavoritos: artistas,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!usuario) return <div>No hay datos de usuario.</div>;

  return (
    <>
    <Navbar hidePerfilButton />
    <div className="mt-7 flex justify-center">
      <FlowInLogo className=" mx-7" />
      <SalasButton />
    </div>
    <PerfilCard usuario={usuario} />
  </>
  );
};

export default Perfil;