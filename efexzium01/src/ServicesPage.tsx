import React from 'react';
import { useTranslation } from 'react-i18next';

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="services-container">
      <div className="stars"></div>
      <div className="content">
        <h1 className="main-title">{t('services.title')}</h1>
        <div className="services-grid">
          <div className="service-card">
            <h2 className="service-title">{t('services.aiConsulting.title')}</h2>
            <p className="service-description">{t('services.aiConsulting.description')}</p>
            <ul className="service-features">
              <li>{t('services.aiConsulting.features.strategy')}</li>
              <li>{t('services.aiConsulting.features.implementation')}</li>
              <li>{t('services.aiConsulting.features.optimization')}</li>
            </ul>
          </div>
          <div className="service-card">
            <h2 className="service-title">{t('services.aiFocus.title')}</h2>
            <p className="service-description">{t('services.aiFocus.description')}</p>
            <ul className="service-features">
              <li>{t('services.aiFocus.features.search')}</li>
              <li>{t('services.aiFocus.features.jira')}</li>
              <li>{t('services.aiFocus.features.goals')}</li>
            </ul>
          </div>
          <div className="service-card">
            <h2 className="service-title">{t('services.aiTrading.title')}</h2>
            <p className="service-description">{t('services.aiTrading.description')}</p>
            <ul className="service-features">
              <li>{t('services.aiTrading.features.analysis')}</li>
              <li>{t('services.aiTrading.features.strategies')}</li>
              <li>{t('services.aiTrading.features.risk')}</li>
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

        .services-container {
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
          margin-bottom: 1rem;
        }

        .service-features {
          list-style-type: none;
          padding-left: 0;
        }

        .service-features li {
          font-size: 0.9rem;
          line-height: 1.4;
          opacity: 0.7;
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .service-features li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #4CAF50;
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
          .service-features li {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;