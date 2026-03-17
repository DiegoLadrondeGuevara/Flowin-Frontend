import { useEffect, useRef, useCallback, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ChatMessage {
  username: string;
  contenido: string;
  timestamp: string;
}

export const useChat = (
  salaId: number,
  token: string
) => {
  const clientRef = useRef<Client | null>(null);
  const [mensajes, setMensajes] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !salaId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${BACKEND_URL}/ws-chat`),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        setStatus('¡Conectado al chat!');
        setError(null);

        // Subscribe to new messages (single message, not the whole list)
        client.subscribe(`/topic/sala/${salaId}`, (message) => {
          const nuevoMensaje: ChatMessage = JSON.parse(message.body);
          setMensajes(prev => [...prev, nuevoMensaje]);
        });

        // Subscribe to errors
        client.subscribe(`/topic/error/${salaId}`, (message) => {
          setError(message.body);
        });
      },
      onStompError: (frame) => {
        console.error('Error STOMP:', frame);
        setStatus('Error de conexión');
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error:', event);
        setStatus('Error de WebSocket');
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [salaId, token]); // Stable dependencies only

  const sendMessage = useCallback((contenido: string) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify({ salaId, contenido }),
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }, [salaId, token]);

  return { mensajes, sendMessage, status, error };
};
