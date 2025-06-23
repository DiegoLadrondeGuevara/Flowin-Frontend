import { type FormEvent } from "react";
import "../styles/App.css";
import useToken from "../contexts/TokenContext";
import { useNavigate } from "react-router";
import { useLogin } from "../api";

export default function Login() {
  const { saveToken } = useToken();
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await login({ username, password });

    if (result.success) {
      saveToken(result.token);
      navigate("/");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Iniciar sesión
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          placeholder="Nombre de usuario"
          type="text"
          name="username"
          required
        />
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          placeholder="Contraseña"
          type="password"
          name="password"
          required
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
