import { useEffect, useRef, useState } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current?.play()
      .then(() => setIsPlaying(true))
      .catch((e) => console.error('Error al reproducir:', e));
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const onEnded = () => setIsPlaying(false);
    audio?.addEventListener('ended', onEnded);

    return () => {
      audio?.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Reproductor de Música</h2>

      <audio
        ref={audioRef}
        src="http://localhost:8080/music/TNT.mp3"
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
