import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import LightSpeedBackground from './LightSpeedBackground';

// Lazy load components
const MainChatUI = lazy(() => import('./MainChatUI'));
const AboutUs = lazy(() => import('./AboutUs'));
const ServicesPage = lazy(() => import('./ServicesPage'));
const ContactUsPage = lazy(() => import('./ContactUsPage'));
const LoginPage = lazy(() => import('./loginPage'));
const SettingsPage = lazy(() => import('./settingsPage'));

// LoadingWrapper component to manage loading state
const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) {
    return <LightSpeedBackground />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<LightSpeedBackground />}>
          <Routes>
            <Route path="*" element={
              <LoadingWrapper>
                <HamburgerMenu header="914AI" />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<MainChatUI />} />
                    <Route path="/Login" element={<LoginPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </main>
              </LoadingWrapper>
            } />
          </Routes>
        </Suspense>
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
          min-height: 100vh;
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