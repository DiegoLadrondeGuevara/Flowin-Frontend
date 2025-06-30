import { type FormEvent } from "react";
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

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const usuario = {
      username: formData.get("username") as string,
      mail: formData.get("mail") as string,
      password: formData.get("password") as string,
    };

    const result = await signup(usuario);

    if (result.success && result.token) {
      saveToken(result.token);
      navigate("/seleccion-artistas");
    } else {
      alert(result.error ?? "Error al registrarse.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <FlowInName className="mb-4" />
        <CardHeader>
          <CardTitle>Crear una cuenta</CardTitle>
          <CardDescription>Ingresa tus datos para registrarte</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              name="username"
              placeholder="Nombre de usuario"
              required
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              name="mail"
              type="email"
              placeholder="Correo electrónico"
              required
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              required
              className="px-4 py-2 border border-gray-300 rounded-md"
            />

            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Registrarse
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <a href="/auth/login" className="ml-1 text-blue-600 hover:underline font-medium">
            Inicia sesión
          </a>
        </CardFooter>
      </Card>
    </main>
  );
}
