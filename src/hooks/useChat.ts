import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface ChatMessage {
  username: string;
  contenido: string;
  timestamp: string;
}

export const useChat = (
  salaId: number,
  onMessageReceived: (mensajes: ChatMessage[]) => void,
  token: string
) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('Conectado al WebSocket');
        client.subscribe(`/topic/sala/${salaId}`, (message) => {
          const mensajes = JSON.parse(message.body);
          onMessageReceived(mensajes);
        });
      },
      onStompError: (frame) => {
        console.error('Error STOMP:', frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [salaId, token, onMessageReceived]);

  const sendMessage = (contenido: string) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify({ salaId, contenido }),
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

  return { sendMessage };
};
