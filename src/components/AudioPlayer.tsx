import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  url: string;
}

const NUM_BARS = 30;

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(NUM_BARS).fill(10));

  const handlePlay = () => {
    audioRef.current?.play()
      .then(() => setIsPlaying(true))
      .catch((e) => console.error('Error al reproducir:', e));
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  // Animación de barras solo si está reproduciendo
  useEffect(() => {
    let timeoutId: number;
    if (isPlaying) {
      const animate = () => {
        setBars(Array.from({ length: NUM_BARS }, () => 10 + Math.random() * 80));
        timeoutId = window.setTimeout(animate, 120);
      };
      animate();
    } else {
      setBars(Array(NUM_BARS).fill(10)); // Línea baja cuando no está reproduciendo
    }
    return () => clearTimeout(timeoutId);
  }, [isPlaying]);

  // Sincroniza el estado isPlaying con el reproductor nativo
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);

    // Pausa cuando cambia la canción
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = 0;

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
    };
  }, [url]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Reproductor de Música</h2>

      {/* Barras animadas o línea */}
      <svg width="100%" height="40" style={{ marginBottom: 16 }}>
        {isPlaying
          ? bars.map((h, i) => (
              <rect
                key={i}
                x={i * 12}
                y={40 - h}
                width={8}
                height={h}
                fill="#3b82f6"
                rx={2}
              />
            ))
          : <rect x={0} y={35} width={NUM_BARS * 12} height={5} fill="#bbb" rx={2} />}
      </svg>

      <audio
        ref={audioRef}
        src={url}
        preload="auto"
        style={{ width: '100%' }}
      >
        Tu navegador no soporta el elemento de audio.
      </audio>

      <div style={{ marginTop: '10px' }}>
        {!isPlaying ? (
          <button onClick={handlePlay} style={{ padding: '10px', width: '100%' }}>
            ▶️ Reproducir
          </button>
        ) : (
          <button onClick={handlePause} style={{ padding: '10px', width: '100%' }}>
            ⏸️ Pausar
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;