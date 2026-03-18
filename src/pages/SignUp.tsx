import { useState, type FormEvent } from "react";
import useToken from "../contexts/TokenContext";
import { useNavigate } from "react-router";
import FlowInName from "../components/FlowInName";
import { useSignup } from "../api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Signup() {
  const { saveToken } = useToken();
  const navigate = useNavigate();
  const { signup } = useSignup();

  const [gustosMusicales, setGustosMusicales] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const generosDisponibles = [
    "Rock",
    "Pop",
    "Jazz",
    "Latina", // <- antes era "Reggaeton"
    "Salsa",
    "Electrónica",
    "Clásica",
    "Indie",
    "Trap",
    "Hip-Hop",
    "Country",
    "Metal",
  ];

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    const usuario = {
      username: formData.get("username") as string,
      mail: formData.get("mail") as string,
      password,
      gustosMusicales: gustosMusicales.length > 0 ? gustosMusicales : undefined,
    };

    const result = await signup(usuario);

    if (result.success && result.token) {
      saveToken(result.token);
      navigate("/seleccion-artistas");
    } else {
      alert(result.error ?? "Error al registrarse.");
    }
  }

  function toggleGenero(genero: string) {
    if (gustosMusicales.includes(genero)) {
      setGustosMusicales(gustosMusicales.filter((g) => g !== genero));
    } else {
      setGustosMusicales([...gustosMusicales, genero]);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-8 relative overflow-hidden">
      {/* Luces de fondo estilo neón */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Card className="w-full max-w-lg bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.2)] relative z-10 my-8">
        <FlowInName className="mb-4 text-white" />
        <CardHeader>
          <CardTitle className="text-white text-2xl">Crear una cuenta</CardTitle>
          <CardDescription className="text-blue-200/70">Ingresa tus datos para registrarte</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <input
              name="username"
              placeholder="Nombre de usuario"
              required
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all"
            />
            <input
              name="mail"
              type="email"
              placeholder="Correo electrónico"
              required
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all"
            />
            
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                )}
              </button>
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar Contraseña"
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                )}
              </button>
            </div>

            {/* 🎵 Gustos musicales como botones seleccionables */}
            <div className="mt-2">
              <label className="text-sm font-semibold text-slate-300 mb-3 block">
                Gustos musicales (opcional)
              </label>
              <div className="flex flex-wrap gap-2.5 mb-2">
                {generosDisponibles.map((genero) => {
                  const seleccionado = gustosMusicales.includes(genero);
                  return (
                    <button
                      type="button"
                      key={genero}
                      onClick={() => toggleGenero(genero)}
                      className={`px-4 py-2 rounded-xl border transition-all duration-200 shadow-sm ${
                        seleccionado
                          ? "bg-blue-600/50 text-white border-blue-400/80 shadow-[0_0_15px_rgba(96,165,250,0.3)] scale-105 font-bold"
                          : "bg-slate-800/60 text-slate-300 border-slate-700 hover:border-blue-400/50 hover:bg-slate-700/80 hover:-translate-y-0.5 font-medium"
                      }`}
                    >
                      {genero}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white font-bold py-5 mt-4 rounded-xl hover:bg-blue-500 shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all">
              Registrarse
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm text-slate-400 pb-2 border-t border-slate-700/50 pt-6 mt-2">
          ¿Ya tienes una cuenta?{" "}
          <a href="/auth/login" className="ml-2 text-blue-400 hover:text-blue-300 hover:underline font-semibold">
            Inicia sesión
          </a>
        </CardFooter>
      </Card>
    </main>
  );
}

