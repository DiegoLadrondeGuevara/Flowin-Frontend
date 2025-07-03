import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../contexts/TokenContext";

const RedirectToStart = () => {
  const context = useContext(TokenContext);

  if (!context) {
    // Si el contexto no está disponible, redirige al login por seguridad
    return <Navigate to="/auth/login" replace />;
  }

  const { token } = context;

  if (token) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};

export default RedirectToStart;