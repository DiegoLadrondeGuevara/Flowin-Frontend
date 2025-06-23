import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useLogin() {
  async function login(user: { username: string; password: string }) {
    try {
      const params = new URLSearchParams();
      params.append("username", user.username);
      params.append("password", user.password);

      const response = await axios.post(`${BACKEND_URL}/auth/login`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const bearerToken = response.data;
      const token = bearerToken.replace("Bearer ", "").trim();

      return { success: true, token };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data || "Usuario o contraseña incorrecta",
      };
    }
  }

  return { login };
}

export function useSignup() {
  async function signup(user: {
    username: string;
    mail: string;
    password: string;
    gustosMusicales?: string;
    artistasFavoritos?: string;
  }) {
    try {
      const res = await axios.post(`${BACKEND_URL}/usuario/registrarse`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const bearerToken = res.data; // ejemplo: "Bearer <token>"
      const token = bearerToken.replace("Bearer ", "").trim();

      return { success: true, token };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data || "Error al registrarse",
      };
    }
  }

  return { signup };
}

