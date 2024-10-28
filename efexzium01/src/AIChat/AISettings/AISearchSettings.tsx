import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface AISearchSettingsProps {
  aiSearchActive: boolean;
  setAISearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const AISearchSettings: React.FC<AISearchSettingsProps> = ({ 
  aiSearchActive, 
  setAISearchActive 
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const savedPreference = localStorage.getItem('aiSearchActive');
    if (savedPreference !== null) {
      setAISearchActive(JSON.parse(savedPreference));
    }
  }, [setAISearchActive]);

  const handleToggle = () => {
    const newValue = !aiSearchActive;
    setAISearchActive(newValue);
    localStorage.setItem('aiSearchActive', JSON.stringify(newValue));
  };

  return (
    <div className="setting-card">
      <h2 className="setting-title">{t('aiSearch.title')}</h2>
      <div className="setting-content">
        <span className="setting-label">{t('aiSearch.activate')}</span>
        <p className="setting-status">
          {t('aiSearch.status', { status: aiSearchActive ? t('aiSearch.active') : t('aiSearch.inactive') })}
        </p>
        <label className="switch">
          <input
            type="checkbox"
            checked={aiSearchActive}
            onChange={handleToggle}
          />
          <span className="slider"></span>
        </label>
      </div>

      
<style>{`
  .setting-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 2rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    color: #ffffff;
    font-family: 'Gotham', 'Montserrat', sans-serif;
    max-width: 400px;
    margin: 0 auto;
  }

  .setting-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }

  .setting-title {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .setting-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .setting-label {
    font-size: 1rem;
  }

  .setting-status {
    font-size: 1rem;
    line-height: 1.5;
    opacity: 0.8;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  @media (max-width: 768px) {
    .setting-card {
      padding: 1rem;
    }

    .setting-title {
      font-size: 1.2rem;
    }

    .setting-label {
      font-size: 0.9rem;
    }

    .setting-status {
      font-size: 0.9rem;
    }

    .switch {
      width: 50px;
      height: 28px;
    }

    .slider:before {
      height: 22px;
      width: 22px;
      left: 3px;
      bottom: 3px;
    }

    input:checked + .slider:before {
      transform: translateX(22px);
    }
  }
`}</style>
    </div>
  );
};

export default AISearchSettings;