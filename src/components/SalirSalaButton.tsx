import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface SalirSalaButtonProps {
  salaId: string | number;
  token: string;
  isHost?: boolean;
  className?: string;
}

const SalirSalaButton: React.FC<SalirSalaButtonProps> = ({ 
  salaId, 
  token,
  isHost = false,
  className = "" 
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSalirSala = async () => {
    if (!token || !salaId) {
      setError("No hay sesión activa o ID de sala.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sala/salir`,
        {}, // Body vacío ya que el salaId puede ir en headers o ser inferido por el token
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirigir a la página principal después de salir exitosamente
      navigate("/home");
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      
      if (error.response?.status === 403) {
        setError("No tienes permisos para salir de esta sala.");
      } else if (error.response?.status === 404) {
        setError("La sala no existe o ya no estás en ella.");
        // Redirigir igualmente ya que la sala no existe
        navigate("/home");
      } else {
        setError(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Error al salir de la sala."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    let confirmed = false;
    if (isHost) {
      confirmed = window.confirm("⚠️ ¿Estás seguro de que quieres salir?\n\nAl salirte, tu sala mágica se cerrará automáticamente para todos los oyentes.");
    } else {
      confirmed = window.confirm("¿Estás seguro de que quieres salir de esta sala?");
    }
    
    if (confirmed) {
      handleSalirSala();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
          isLoading
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 text-white shadow hover:shadow-lg"
        } ${className}`}
      >
        {isLoading ? "Saliendo..." : "Salir de la Sala"}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 text-center max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default SalirSalaButton;
