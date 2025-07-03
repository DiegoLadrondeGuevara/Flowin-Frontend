import React, { useEffect, useState } from "react";

interface ModernAudioPlayerProps {
  title: string;
  artist: string;
  audioSrc: string;
}

const ModernAudioPlayer: React.FC<ModernAudioPlayerProps> = ({
  title,
  artist,
  audioSrc,
}) => {
  const [bars, setBars] = useState<number[]>(Array(60).fill(0));

  const NUM_BARS = 60;

  useEffect(() => {
  let timeoutId: number;
  const animate = () => {
    const newBars = Array.from({ length: NUM_BARS }).map(
      () => Math.random() * 100
    );
    setBars(newBars);
    timeoutId = window.setTimeout(animate, 120); // 120 ms entre frames
  };

  animate();

  return () => {
    clearTimeout(timeoutId);
  };
}, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-6xl font-extrabold text-white mb-8">{title}</h2>

      {/* Ondas simuladas */}
      <svg
        width="100%"
        height="100"
        viewBox={`0 0 ${NUM_BARS * 10} 100`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-10"
      >
        {bars.map((val, i) => (
          <rect
            key={i}
            x={i * 10}
            y={100 - val}
            width={4}
            height={val}
            rx={2}
            fill="#ffffff"
          />
        ))}
      </svg>

      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white">{artist}</h3>
      </div>

      {/* Aquí usas audioSrc */}
      <audio controls src={audioSrc} className="w-full mt-4" />

    </div>
  );
};

export default ModernAudioPlayer;