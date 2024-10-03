import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <div className="stars"></div>
      <div className="content">
        <h1 className="main-title">About Us</h1>
        <div className="services-grid">
          <div className="service-card">
            <h2 className="service-title">AI Consulting</h2>
            <p className="service-description">Modernize your business with AI</p>
          </div>
          <div className="service-card">
            <h2 className="service-title">AI Focus</h2>
            <p className="service-description">An AI that helps you search the internet and be a conversational JIRA while focusing on your goals</p>
          </div>
          <div className="service-card">
            <h2 className="service-title">AI Trading</h2>
            <p className="service-description">AI trade bot that analyzes the market to seize all opportunities</p>
          </div>
        </div>
      </div>
      <style >{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

        .about-us-container {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          color: #ffffff;
          font-family: 'Gotham', 'Montserrat', sans-serif;
          background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        }

        .content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
        }

        .main-title {
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 3rem;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
        }

        .service-card {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .service-description {
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.8;
        }

        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 120%;
          transform: rotate(-45deg);
        }

        .stars {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: zoom 5s infinite;
          opacity: 0;
        }

        @keyframes zoom {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-45deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1.2) rotate(-45deg);
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem;
          }
          .service-title {
            font-size: 1.2rem;
          }
          .service-description {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;