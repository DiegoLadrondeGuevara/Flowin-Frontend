import React, { useEffect, useRef } from "react";

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

  // Sync playback for listeners (non-host)
  useEffect(() => {
    if (isHost || !audioRef.current) return;

    const audio = audioRef.current;

    if (syncTime !== undefined && Math.abs(audio.currentTime - syncTime) > 2) {
      audio.currentTime = syncTime;
    }

    if (syncPlaying !== undefined) {
      if (syncPlaying && audio.paused) {
        audio.play().catch(() => {});
      } else if (!syncPlaying && !audio.paused) {
        audio.pause();
      }
    }
  }, [syncTime, syncPlaying, isHost]);

  // Load new source when audioSrc changes
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
    }
  }, [audioSrc]);

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
    <div className="w-full flex flex-col items-center">
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
        className="w-full mt-4"
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