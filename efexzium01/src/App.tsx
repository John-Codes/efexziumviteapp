import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import MainChatUI from './MainChatUI';
import AboutUs from './AboutUs';
import ServicesPage from './ServicesPage';
import ContactUsPage from './ContactUsPage';
import LoginPage from './loginPage';
import SettingsPage from './settingsPage';




const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <HamburgerMenu header="914AI" />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainChatUI />} />
            <Route path="/Login" element={<LoginPage/>}/>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
      <style  >{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .app {
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }
        .main-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          padding-top: 60px; /* Adjust based on your HamburgerMenu height */
        }
        .full-page {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          padding: 20px;
        }
      `}</style>
    </Router>
  );
};

export default App;