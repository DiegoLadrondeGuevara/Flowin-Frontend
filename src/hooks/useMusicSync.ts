import { useEffect, useRef, useCallback, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface MusicState {
  salaId: number;
  songName: string | null;
  songUrl: string | null;
  currentTime: number;
  playing: boolean;
  lastUpdateTimestamp: number;
  trackIndex: number;
}

export const useMusicSync = (
  salaId: number,
  token: string,
  isHost: boolean
) => {
  const clientRef = useRef<Client | null>(null);
  const [musicState, setMusicState] = useState<MusicState | null>(null);
  const [connected, setConnected] = useState(false);

  // Fetch initial state when joining
  useEffect(() => {
    if (!token || !salaId) return;

    const fetchInitialState = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/sala/${salaId}/music-state`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMusicState(response.data);
      } catch (err) {
        console.error('Error fetching music state:', err);
      }
    };

    fetchInitialState();
  }, [salaId, token]);

  // Subscribe to music state changes
  useEffect(() => {
    if (!token || !salaId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${BACKEND_URL}/ws-chat`),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        setConnected(true);

        client.subscribe(`/topic/sala/${salaId}/music`, (message) => {
          const state: MusicState = JSON.parse(message.body);
          setMusicState(state);
        });
      },
      onStompError: () => setConnected(false),
      onWebSocketError: () => setConnected(false),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      setConnected(false);
    };
  }, [salaId, token]);

  // Host-only actions
  const sendAction = useCallback(
    (action: string, data: Partial<MusicState> = {}) => {
      if (!isHost || !clientRef.current?.connected) return;

      clientRef.current.publish({
        destination: '/app/music.action',
        body: JSON.stringify({
          salaId,
          action,
          songName: data.songName,
          songUrl: data.songUrl,
          currentTime: data.currentTime ?? 0,
          trackIndex: data.trackIndex ?? 0,
        }),
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    [salaId, token, isHost]
  );

  const play = useCallback(
    (currentTime: number) => sendAction('play', { currentTime }),
    [sendAction]
  );

  const pause = useCallback(
    (currentTime: number) => sendAction('pause', { currentTime }),
    [sendAction]
  );

  const seek = useCallback(
    (currentTime: number) => sendAction('seek', { currentTime }),
    [sendAction]
  );

  const changeTrack = useCallback(
    (songName: string, songUrl: string, trackIndex: number) =>
      sendAction('change_track', { songName, songUrl, trackIndex }),
    [sendAction]
  );

  return {
    musicState,
    connected,
    play,
    pause,
    seek,
    changeTrack,
    isHost,
  };
};
