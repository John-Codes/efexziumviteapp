import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

interface HamburgerMenuProps {
  header: React.ReactNode;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ header }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <nav className={`menu ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" className="menu-item" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/Login" className="menu-item" onClick={() => setIsOpen(false)}>Login</NavLink>
          <NavLink to="/about" className="menu-item" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/services" className="menu-item" onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink to="/contact" className="menu-item" onClick={() => setIsOpen(false)}>Contact</NavLink>
          <NavLink to="/Settings" className="menu-item" onClick={() => setIsOpen(false)}>Settings</NavLink>
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
            background-color: #111827;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
          }
          .header-section {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            color: #ffffff;
            font-family: 'Gotham', 'Montserrat', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-align: center;
            transition: all 0.3s ease;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            white-space: nowrap;
          }
          .header-section:hover {
            letter-spacing: 0.2em;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
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
            color: #93c5fd;
            transition: color 0.2s ease;
          }
          .hamburger-button:hover {
            color: #bfdbfe;
          }
          .hamburger-button:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.5);
          }
          .menu {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 8px;
            width: 200px;
            background-color: rgba(17, 24, 39, 0.9);
            border: 1px solid #4b5563;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
            backdrop-filter: blur(5px);
          }
          .menu.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .menu-item {
            display: block;
            padding: 10px 15px;
            color: #ffffff;
            text-decoration: none;
            transition: background-color 0.2s ease;
            white-space: nowrap;
          }
          .menu-item:hover {
            background-color: rgba(55, 65, 81, 0.8);
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