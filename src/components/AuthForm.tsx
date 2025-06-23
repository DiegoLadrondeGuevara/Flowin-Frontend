import { type FormEvent } from "react";

export default function AuthForm({ mode = "login", onSubmit }: {
  mode?: "login" | "signup";
  onSubmit: (formData: Record<string, any>) => void;
}) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const payload: Record<string, any> = {
      username: data.get("username"),
      password: data.get("password"),
    };

    if (mode === "signup") {
      payload.mail = data.get("mail");
      payload.gustosMusicales = data.get("gustosMusicales");
      payload.artistasFavoritos = data.get("artistasFavoritos");
    }

    onSubmit(payload);
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          placeholder="Nombre de usuario"
          type="text"
          name="username"
          required
          minLength={3}
        />
        {mode === "signup" && (
          <>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              placeholder="Correo"
              type="email"
              name="mail"
              required
            />
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              placeholder="Gustos musicales (opcional)"
              type="text"
              name="gustosMusicales"
            />
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              placeholder="Artistas favoritos (opcional)"
              type="text"
              name="artistasFavoritos"
            />
          </>
        )}
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          placeholder="Contraseña"
          type="password"
          name="password"
          required
          minLength={6}
        />
        <button
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-semibold"
          type="submit"
        >
          {mode === "login" ? "Iniciar sesión" : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
