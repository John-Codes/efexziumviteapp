import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HamburgerMenuProps {
  header: React.ReactNode;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ header }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="hamburger-menu-container">
      <div className="hamburger-menu" ref={menuRef}>
        <button
          className="hamburger-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('menu.toggleAria')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <nav className={`menu ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" className="menu-item" onClick={() => setIsOpen(false)}>{t('menu.home')}</NavLink>
          <NavLink to="/led" className="menu-item" onClick={() => setIsOpen(false)}>LED Signs</NavLink>
          <NavLink to="/Login" className="menu-item" onClick={() => setIsOpen(false)}>{t('menu.login')}</NavLink>
          <NavLink to="/about" className="menu-item" onClick={() => setIsOpen(false)}>{t('menu.about')}</NavLink>
          <NavLink to="/services" className="menu-item" onClick={() => setIsOpen(false)}>{t('menu.services')}</NavLink>
          <NavLink to="/contact" className="menu-item" onClick={() => setIsOpen(false)}>{t('menu.contact')}</NavLink>
          <NavLink to="/settings" className="menu-item" onClick={() => setIsOpen(false)}>{t('menu.settings')}</NavLink>
          {/* <NavLink to="/plans" className="menu-item" onClick={() => setIsOpen(false)}>{t('menu.plans')}</NavLink> */}
        </nav>
      </div>
      <div className="header-section">{header}</div>
      <div className="spacer"></div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

          .hamburger-menu-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.03);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .header-section {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.95);
            font-family: 'Gotham', 'Montserrat', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-align: center;
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 0.5),
              0 0 20px rgba(255, 255, 255, 0.3);
            white-space: nowrap;
            transition: all 0.3s ease;
          }

          .header-section:hover {
            letter-spacing: 0.2em;
          }

          .hamburger-menu {
            position: relative;
            z-index: 1001;
          }

          .spacer {
            width: 24px;
          }

          .hamburger-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            color: rgba(255, 255, 255, 0.9);
            transition: all 0.2s ease;
          }

          .hamburger-button:hover {
            color: rgba(255, 255, 255, 1);
            transform: scale(1.05);
          }

          .hamburger-button:focus {
            outline: none;
            border-radius: 4px;
          }

          .menu {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 8px;
            width: 200px;
            background-color: rgba(0, 0, 0, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 
              0 4px 6px rgba(0, 0, 0, 0.4),
              0 0 20px rgba(0, 0, 0, 0.3);
          }

          .menu.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .menu-item {
            display: block;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            transition: all 0.2s ease;
            white-space: nowrap;
            font-weight: 500;
            border-radius: 8px;
            margin: 4px 8px;
            position: relative;
            overflow: hidden;
          }

          .menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 1);
            transform: translateX(4px);
          }

          @media (max-width: 768px) {
            .menu {
              width: auto;
              min-width: 200px;
            }
            .header-section {
              font-size: 1.2rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HamburgerMenu;