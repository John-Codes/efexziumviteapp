import React from 'react';

const DenseStarryBackground: React.FC = () => {
  return (
    <>
      <div className="dense-starry-background">
        <div className="stars small"></div>
        <div className="stars medium"></div>
        <div className="stars large"></div>
      </div>
      <style jsx>{`
        .dense-starry-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
          overflow: hidden;
        }
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 120%;
          transform: rotate(-45deg);
        }
        .small {
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 160px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 160px 120px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s infinite;
          opacity: 0.5;
        }
        .medium {
          background-image: 
            radial-gradient(2px 2px at 100px 50px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 200px 150px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 300px 250px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 400px 350px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 400px 400px;
          animation: twinkle 4s infinite;
          opacity: 0.4;
        }
        .large {
          background-image: 
            radial-gradient(3px 3px at 50px 100px, #fff, rgba(0,0,0,0)),
            radial-gradient(3px 3px at 150px 300px, #fff, rgba(0,0,0,0)),
            radial-gradient(3px 3px at 250px 500px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 600px 600px;
          animation: twinkle 3s infinite;
          opacity: 0.3;
        }
        @keyframes twinkle {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
};

export default DenseStarryBackground;