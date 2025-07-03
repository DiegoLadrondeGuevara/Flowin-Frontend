import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error("VITE_BACKEND_URL no está definido en las variables de entorno");
}

type LoginCredentials = {
  username: string;
  password: string;
};

type SignupData = {
  username: string;
  mail: string;
  password: string;
  gustosMusicales?: string[];
  artistasFavoritos?: string[];
};

export function useLogin() {
  async function login(user: LoginCredentials) {
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
      const token = extractToken(bearerToken);

      return { success: true, token };
    } catch (error: unknown) {
      const errorMsg = extractErrorMessage(error);
      return { success: false, error: errorMsg };
    }
  }

  return { login };
}

export function useSignup() {
  async function signup(user: SignupData) {
    try {
      const response = await axios.post(`${BACKEND_URL}/usuario/registrarse`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      const bearerToken = response.data;
      const token = extractToken(bearerToken);

      return { success: true, token };
    } catch (error: unknown) {
      const errorMsg = extractErrorMessage(error);
      return { success: false, error: errorMsg };
    }
  }

  return { signup };
}

export async function actualizarArtistasFavoritos(artistas: string[]) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró el token de autenticación");

  const response = await axios.patch(
    `${BACKEND_URL}/usuario/actualizar-artistas`,
    { artistasFavoritos: artistas },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

// ✅ Actualizar gustos musicales
export async function actualizarGustosMusicales(gustos: string[]) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación");
  }

  try {
    const response = await axios.put(
      `${BACKEND_URL}/usuario/actualizar-gustosMusicales`,
      { gustosMusicales: gustos },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new Error(extractErrorMessage(error));
  }
}

// Utils
function extractToken(bearerString: string): string {
  if (bearerString?.startsWith("Bearer ")) {
    return bearerString.replace("Bearer ", "").trim();
  }
  return bearerString;
}

function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (typeof error.response?.data === "string") {
      return error.response.data;
    }
    if (typeof error.response?.data?.message === "string") {
      return error.response.data.message;
    }
    return error.message || "Error desconocido con Axios";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error desconocido";
}
