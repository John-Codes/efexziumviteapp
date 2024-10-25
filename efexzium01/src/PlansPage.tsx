import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

declare global {
  interface Window {
    paypal?: any;
  }
}

const Plans: React.FC = () => {
  const { t } = useTranslation();
  const paypalButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=AYihfJFFBqc1y7RajPEL63YwvY7Yx7DmP_fKzH_B4JFCDBcJbKQd83PXvUYIC5c6axJUZekd6y2ysScF&vault=true&intent=subscription";
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.paypal && paypalButtonRef.current) {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: function() {
            return window.paypal.Subscription.create({
              plan_id: 'P-3G009654WW6218039M4FM2GI'
            });
          },
          onApprove: function(data: { subscriptionID: string }) {
            console.log('Subscription approved. Subscription ID:', data.subscriptionID);
            alert('Subscription successful! Subscription ID: ' + data.subscriptionID);
          }
        }).render(paypalButtonRef.current);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="plans-container">
      <div className="stars"></div>
      <div className="content">
        <h1 className="main-title">{t('plans.title')}</h1>
        <div className="plans-grid">
          <div className="plan-card">
            <h2 className="plan-title">{t('plans.basic.title')}</h2>
            <p className="plan-description">{t('plans.basic.description')}</p>
            <p className="plan-price">{t('plans.basic.price')}</p>
          </div>
          <div className="plan-card">
            <h2 className="plan-title">{t('plans.premium.title')}</h2>
            <p className="plan-description">{t('plans.premium.description')}</p>
            <p className="plan-price">{t('plans.premium.price')}</p>
            <div ref={paypalButtonRef}></div>
          </div>
        </div>
      </div>
    
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

  .plans-container {
    position: fixed; /* Changed from relative to fixed */
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: auto; /* Added to handle content overflow */
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
    justify-content: flex-start; /* Changed from center to flex-start */
    min-height: 100vh;
    padding: 2rem;
    padding-top: 8rem; /* Added to ensure 8rem margin for heading */
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

  .plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 800px;
  }

  .plan-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 2rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px); /* Added for Safari support */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }

  .plan-title {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .plan-description {
    font-size: 1rem;
    line-height: 1.5;
    opacity: 0.8;
    text-align: center;
    margin-bottom: 1rem;
  }

  .plan-price {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    transform: rotate(-45deg);
    pointer-events: none; /* Added to ensure clicks pass through */
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

  /* Added styles for glass effect menus */
  :global(.hamburger-menu) {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
  }

  @media (max-width: 768px) {
    .content {
      padding-top: 6rem; /* Slightly reduced top padding for mobile */
    }
    
    .main-title {
      font-size: 2rem;
    }
    .plan-title {
      font-size: 1.2rem;
    }
    .plan-description {
      font-size: 0.9rem;
    }
    .plan-price {
      font-size: 1.1rem;
    }
  }
`}</style>
    </div>
  );
};

export default Plans;