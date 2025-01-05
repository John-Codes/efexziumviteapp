import React, { useMemo } from 'react';

const NoStarBackground: React.FC = () => {
  const generateStars = (count: number, size: number) => {
    return Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${size * (0.8 + Math.random() * 0.4)}px`,
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
                  }}
                />
                <div
                  className="star"
                  style={{
                    width: star.size,
                    height: star.size,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
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
        }
        .star-glow {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};

export default NoStarBackground;