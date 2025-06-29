// src/services/usuarioService.ts
import axios from 'axios';

export const actualizarArtistasFavoritos = async (artistas: string[]) => {
  const token = localStorage.getItem('token');
  return axios.put(
    '/usuario/actualizar-artistas',
    { artistasFavoritos: artistas },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
