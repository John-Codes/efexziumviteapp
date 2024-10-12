import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactUsPage: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-us-container">
      <div className="stars"></div>
      <div className="content">
        <h1 className="main-title">{t('contactUs.title')}</h1>
        <div className="contact-grid">
          <div className="contact-form-card">
            <h2 className="section-title">{t('contactUs.form.title')}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{t('contactUs.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contactUs.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t('contactUs.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">{t('contactUs.form.submit')}</button>
            </form>
          </div>
          <div className="contact-info-card">
            <h2 className="section-title">{t('contactUs.info.title')}</h2>
            <div className="contact-info">
              <p><strong>{t('contactUs.info.email')}:</strong> efexzium@gmail.com</p>
              <p><strong>{t('contactUs.info.phone')}:</strong> +1 (787) 525-6420</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">{t('contactUs.info.linkedin')}</a>
              <a href="#" className="social-link">{t('contactUs.info.youtube')}</a>
            </div>
          </div>
        </div>
      </div>
  
<style >{`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

  .contact-us-container {
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

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
  }

  .contact-form-card, .contact-info-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 2rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
  }

  .contact-form-card:hover, .contact-info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-size: 1rem;
  }

  .form-group textarea {
    height: 150px;
    resize: vertical;
  }

  .submit-button {
    background-color: #4CAF50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }

  .submit-button:hover {
    background-color: #45a049;
  }

  .contact-info p {
    margin-bottom: 1rem;
  }

  .social-links {
    margin-top: 2rem;
  }

  .social-link {
    display: inline-block;
    margin-right: 1rem;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .social-link:hover {
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
    .section-title {
      font-size: 1.2rem;
    }
    .contact-form-card, .contact-info-card {
      padding: 1.5rem;
    }
    .form-group input,
    .form-group textarea,
    .submit-button {
      font-size: 0.9rem;
      padding: 0.6rem;
      width: 65%;
      margin: 0 auto;
      display: block;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .contact-grid {
      grid-template-columns: 1fr;
    }
    .form-group label {
      text-align: center;
    }
    .submit-button {
      width: auto;
      margin-top: 1rem;
    }
  }
`}</style>
    </div>
  );
};

export default ContactUsPage;



