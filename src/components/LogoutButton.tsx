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
      className="bg-white text-blue-600 font-bold px-4 py-2 rounded-md transition-colors hover:bg-blue-50"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
