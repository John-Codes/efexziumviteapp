import React, { useEffect, useRef } from 'react';

const RainbowLightSpeedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    const starCount = 1000;
    const stars: { x: number; y: number; z: number; prevZ: number; speed: number; hue: number }[] = [];

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 2000,
        prevZ: 0,
        speed: Math.random() * 5 + 5, // Random speed between 5 and 10
        hue: Math.random() * 360 // Random initial hue
      });
    }

    let hueShift = 0;

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Dark background with reduced opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      hueShift = (hueShift + 0.5) % 360; // Increment hue shift

      // Update and draw stars
      for (let star of stars) {
        star.prevZ = star.z;
        star.z -= star.speed; // Use individual star speed

        if (star.z <= 0) {
          star.z = 2000;
          star.prevZ = 2000;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
          star.speed = Math.random() * 5 + 5; // Reset speed when star restarts
        }

        const sx = (star.x / star.z) * 2000 + centerX;
        const sy = (star.y / star.z) * 2000 + centerY;
        const px = (star.x / star.prevZ) * 2000 + centerX;
        const py = (star.y / star.prevZ) * 2000 + centerY;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);

        const size = (1 - star.z / 2000) * 2;
        ctx.lineWidth = size;
        const intensity = 1 - star.z / 2000;
        
        // Calculate rainbow color
        const hue = (star.hue + hueShift) % 360;
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${intensity})`;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'black',
      }}
    />
  );
};

export default RainbowLightSpeedBackground;