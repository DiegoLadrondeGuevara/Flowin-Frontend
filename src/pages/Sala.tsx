import React, { useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import type { IMessage } from '@stomp/stompjs';

type ChatMessage = {
  username: string;
  contenido: string;
};

const Sala = () => {
  const [token, setToken] = useState('');
  const [salaId, setSalaId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [status, setStatus] = useState('');
  const [mensajes, setMensajes] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const stompClientRef = useRef<Client | null>(null);

  const connect = () => {
    if (!token || !salaId) {
      alert('Token y Sala ID son requeridos');
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'),
      connectHeaders: {
        Authorization: token,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        setStatus('Conectado al chat.');
        setError(null);

        client.subscribe(`/topic/sala/${salaId}`, (message: IMessage) => {
          const newMessages: ChatMessage[] = JSON.parse(message.body);
          setMensajes(newMessages);
        });

        client.subscribe(`/topic/error/${salaId}`, (message: IMessage) => {
          setError(message.body);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        setStatus('Error STOMP');
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error:', event);
        setStatus('Error de WebSocket');
      },
    });

    stompClientRef.current = client;
    client.activate();
  };

  const enviarMensaje = () => {
    if (!mensaje || !stompClientRef.current || !stompClientRef.current.connected) return;

    const msg = {
      contenido: mensaje,
      salaId: parseInt(salaId, 10),
    };

    stompClientRef.current.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(msg),
      headers: { Authorization: token },
    });

    setMensaje('');
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Probar Chat WebSocket</h2>

      <label>Bearer Token:</label>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Bearer eyJhbGciOi..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <label>ID de la Sala:</label>
      <input
        type="number"
        value={salaId}
        onChange={(e) => setSalaId(e.target.value)}
        placeholder="Ej: 1"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <button onClick={connect} style={{ padding: '10px', width: '100%' }}>
        Conectar
      </button>

      <div style={{ marginTop: '10px', color: 'green' }}>{status}</div>

      <div
        id="chat"
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'auto',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        {mensajes.map((m, i) => (
          <div key={i}>
            <strong>{m.username}:</strong> {m.contenido}
          </div>
        ))}
        {error && (
          <div style={{ color: 'red' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe tu mensaje..."
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />

      <button onClick={enviarMensaje} style={{ padding: '10px', width: '100%' }}>
        Enviar
      </button>
    </div>
  );
};

export default Sala;
//hola