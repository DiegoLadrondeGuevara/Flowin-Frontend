import { type FormEvent } from "react";
import { useNavigate } from "react-router";
import useToken from "../contexts/TokenContext";
import { useLogin } from "../api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

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
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Inicia sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
          <CardAction>
            <a
              href="/signup"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Registrarse
            </a>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              name="username"
              type="text"
              required
              placeholder="Nombre de usuario"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Contraseña"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?
        </CardFooter>
      </Card>
    </main>
  );
}
