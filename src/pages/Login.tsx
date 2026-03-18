import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import useToken from "../contexts/TokenContext";
import { useLogin } from "../api";
import FlowInName from "../components/FlowInName";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Login() {
  const { saveToken } = useToken();
  const navigate = useNavigate();
  const { login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await login({ username, password });

    if (result.success && result.token) {
      saveToken(result.token);
      navigate("/");
    } else {
      alert(result.error ?? "Error al iniciar sesión.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 relative overflow-hidden">
      {/* Luces de fondo estilo neón */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Card className="w-full max-w-sm bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.2)] relative z-10">
        <FlowInName className="mb-4 text-white" />
        <CardHeader>
          <CardTitle className="text-white text-2xl">Inicia sesión</CardTitle>
          <CardDescription className="text-blue-200/70">Ingresa tus credenciales para continuar</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              name="username"
              type="text"
              required
              placeholder="Nombre de usuario"
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Contraseña"
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

            <Button type="submit" className="w-full bg-blue-600 text-white font-bold py-5 rounded-xl hover:bg-blue-500 shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>

        <CardAction className="w-full text-center text-sm text-slate-400 pb-2">
          ¿No tienes una cuenta?
          <a
            href="/usuario/registrarse"
            className="ml-2 text-blue-400 hover:text-blue-300 hover:underline font-semibold"
          >
            Regístrate
          </a>
        </CardAction>
      </Card>
    </main>
  );
}
