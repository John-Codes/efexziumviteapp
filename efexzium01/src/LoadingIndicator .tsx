import React, { useState, useEffect } from 'react';

const LoadingIndicator: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);

  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColors(Array(5).fill(null).map(() => generateRandomColor()));
    }, 1000); // Change colors every 1000ms (1 second)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3px',
      overflow: 'hidden',
      zIndex: 9999,
    }}>
      <style>
        {`
          @keyframes moveRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes glow {
            0% { filter: blur(4px) brightness(1); }
            50% { filter: blur(6px) brightness(1.3); }
            100% { filter: blur(4px) brightness(1); }
          }
        `}
      </style>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(8px)',
      }} />
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: color,
            animation: `moveRight 1.5s linear infinite, glow 2s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`,
            opacity: 1 - index * 0.15,
            boxShadow: `0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color}`,
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </div>
  );
};

export default LoadingIndicator;