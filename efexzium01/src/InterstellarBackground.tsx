import React, { useMemo } from 'react';

const InterstellarBackground: React.FC = () => {
  const generateStars = (count: number, size: number) => {
    return Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${size * (0.8 + Math.random() * 0.4)}px`,
      animationDuration: `${3 + Math.random() * 7}s`,
      animationDelay: `${Math.random() * 5}s`,
      glowSize: `${size * (2 + Math.random() * 2)}px`,
      glowOpacity: 0.1 + Math.random() * 0.4,
    }));
  };

  const starLayers = useMemo(() => [
    { count: 250, size: 1 },
    { count: 150, size: 2 },
    { count: 50, size: 3 },
    { count: 15, size: 4 },
  ].map(layer => generateStars(layer.count, layer.size)), []);

  return (
    <>
      <div className="interstellar-background">
        {starLayers.map((layer, index) => (
          <div key={index} className="star-layer">
            {layer.map((star, starIndex) => (
              <div
                key={starIndex}
                className="star-container"
                style={{
                  left: star.left,
                  top: star.top,
                }}
              >
                <div
                  className="star-glow"
                  style={{
                    width: star.glowSize,
                    height: star.glowSize,
                    opacity: star.glowOpacity,
                    animationDuration: star.animationDuration,
                    animationDelay: star.animationDelay,
                  }}
                />
                <div
                  className="star"
                  style={{
                    width: star.size,
                    height: star.size,
                    animationDuration: star.animationDuration,
                    animationDelay: star.animationDelay,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <style >{`
        .interstellar-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
          overflow: hidden;
          z-index: -1;
        }
        .star-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .star-container {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .star {
          position: absolute;
          background-color: #ffffff;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }
        .star-glow {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          animation: glow ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
      `}</style>
    </>
  );
};

export default InterstellarBackground;