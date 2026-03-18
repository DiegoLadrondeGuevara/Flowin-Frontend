import React, { useEffect, useRef, useState } from "react";

interface ModernAudioPlayerProps {
  title: string;
  artist: string;
  audioSrc: string;
  // Music sync callbacks (host only)
  onPlay?: (currentTime: number) => void;
  onPause?: (currentTime: number) => void;
  onSeeked?: (currentTime: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
  // Sync state (listener)
  syncTime?: number;
  syncPlaying?: boolean;
  isHost?: boolean;
}

const NUM_BARS = 60;

const ModernAudioPlayer: React.FC<ModernAudioPlayerProps> = ({
  title,
  artist,
  audioSrc,
  onPlay,
  onPause,
  onSeeked,
  syncTime,
  syncPlaying,
  isHost = true,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasJoined, setHasJoined] = useState(isHost);

  // Sync playback for listeners (non-host)
  useEffect(() => {
    if (isHost || !audioRef.current) return;

    const audio = audioRef.current;

    if (syncTime !== undefined && Math.abs(audio.currentTime - syncTime) > 1) {
      audio.currentTime = syncTime;
    }

    if (syncPlaying !== undefined && hasJoined) {
      if (syncPlaying && audio.paused) {
        audio.play().catch(() => {});
      } else if (!syncPlaying && !audio.paused) {
        audio.pause();
      }
    }
  }, [syncTime, syncPlaying, isHost, hasJoined]);

  // Load new source when audioSrc changes
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
    }
  }, [audioSrc]);

  // Live Sync Heartbeat for Listeners
  useEffect(() => {
    if (!isHost || !onSeeked || !audioRef.current) return;

    // We broadcast the host's exact audio position every 4 seconds to sync late-joiners.
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        onSeeked(audioRef.current.currentTime);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHost, onSeeked]);

  const handlePlay = () => {
    if (isHost && onPlay && audioRef.current) {
      onPlay(audioRef.current.currentTime);
    }
  };

  const handlePause = () => {
    if (isHost && onPause && audioRef.current) {
      onPause(audioRef.current.currentTime);
    }
  };

  const handleSeeked = () => {
    if (isHost && onSeeked && audioRef.current) {
      onSeeked(audioRef.current.currentTime);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative min-h-[300px] justify-center">
      {!hasJoined && !isHost && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center z-50 rounded-3xl border border-white/10 p-6">
          <button 
            onClick={() => {
              setHasJoined(true);
              if (syncPlaying && audioRef.current) {
                audioRef.current.play().catch(() => {});
              }
            }}
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105 transition-all animate-bounce flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
            Sintonizar Radio
          </button>
          <p className="text-white/70 mt-4 text-sm max-w-xs text-center font-medium">
            El navegador requiere que hagas clic para sincronizarte con el Host.
          </p>
        </div>
      )}

      <h2 className="text-6xl font-extrabold text-white mb-8">{title}</h2>

      {/* CSS-powered audio visualizer — zero React re-renders */}
      <div className="flex items-end justify-center gap-[2px] h-[100px] mb-10">
        {Array.from({ length: NUM_BARS }).map((_, i) => (
          <div
            key={i}
            className="w-[4px] bg-white rounded-full"
            style={{
              animation: `audioBar 0.8s ease-in-out ${i * 0.02}s infinite alternate`,
              height: `${20 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes audioBar {
          0% { transform: scaleY(0.3); opacity: 0.4; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white">{artist}</h3>
      </div>

      <audio
        ref={audioRef}
        controls
        src={audioSrc}
        className={`w-full mt-4 ${!isHost ? "pointer-events-none opacity-60 grayscale shadow-inner rounded-full" : ""}`}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeeked={handleSeeked}
      />

      {!isHost && (
        <p className="text-white/60 text-sm mt-3">
          🎵 Sincronizado con el host
        </p>
      )}
    </div>
  );
};

export default ModernAudioPlayer;