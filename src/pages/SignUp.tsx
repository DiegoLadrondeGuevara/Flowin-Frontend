import { type FormEvent } from "react";
import "../styles/App.css";
import useToken from "../contexts/TokenContext";
import { useNavigate } from "react-router";
import { useSignup } from "../api";

export default function Signup() {
  const { saveToken } = useToken();
  const navigate = useNavigate();
  const { signup } = useSignup();

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const usuario = {
      username: formData.get("username") as string,
      mail: formData.get("mail") as string,
      password: formData.get("password") as string,
      gustosMusicales: formData.get("gustosMusicales") as string,
      artistasFavoritos: formData.get("artistasFavoritos") as string,
    };

    const result = await signup(usuario);

    if (result.success) {
      saveToken(result.token);
      navigate("/usuario_login");
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Registrarse
      </h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input name="username" placeholder="Nombre de usuario" required className="input" />
        <input name="mail" placeholder="Correo electrónico" type="email" required className="input" />
        <input name="password" placeholder="Contraseña" type="password" required className="input" />
        <input name="gustosMusicales" placeholder="Gustos musicales (opcional)" className="input" />
        <input name="artistasFavoritos" placeholder="Artistas favoritos (opcional)" className="input" />
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-semibold">
          Registrarse
        </button>
      </form>
    </div>
  );
}

