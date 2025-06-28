import { useNavigate } from "react-router-dom";
import useToken from "../contexts/TokenContext";

const LogoutButton = () => {
  const { removeToken } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        padding: "8px 16px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "white",
        color: "#333",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
