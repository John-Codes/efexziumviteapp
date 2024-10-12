import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HamburgerMenu from './HamburgerMenu';
import LightSpeedBackground from './LightSpeedBackground';

// Import translations
import enTranslations from './locales/en/translation.json';
import esTranslations from './locales/es/translation.json';

// Configure i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

// Lazy load components
const MainChatUI = lazy(() => import('./MainChatUI'));
const AboutUs = lazy(() => import('./AboutUs'));
const ServicesPage = lazy(() => import('./ServicesPage'));
const ContactUsPage = lazy(() => import('./ContactUsPage'));
const LoginPage = lazy(() => import('./loginPage'));
const SettingsPage = lazy(() => import('./settingsPage'));
const Plans = lazy(() => import('./PlansPage'));

// LoadingWrapper component to manage loading state
const LoadingWrapper: React.FC<{ children: React.ReactNode; setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }> = ({ children, setIsLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="app">
          <Suspense fallback={<LightSpeedBackground />}>
            <Routes>
              <Route path="*" element={
                <>
                  {isLoading && <LightSpeedBackground />}
                  <LoadingWrapper setIsLoading={setIsLoading}>
                    {!isLoading && <HamburgerMenu header="914AI" />}
                    <main className="main-content">
                      <Routes>
                        <Route path="/" element={<MainChatUI />} />
                        <Route path="/Login" element={<LoginPage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactUsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/Plans" element={<Plans/>} />
                      </Routes>
                    </main>
                  </LoadingWrapper>
                </>
              } />
            </Routes>
          </Suspense>
        </div>
        <style>{`
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
    </I18nextProvider>
  );
};

export default App;