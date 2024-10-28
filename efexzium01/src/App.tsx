import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HamburgerMenu from './AIChat/Menu/HamburgerMenu';
import LightSpeedBackground from './Backgrounds/LightSpeedBackground';
import './index.css';

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
const MainChatUI = lazy(() => import('./AIChat/AIChatUI/MainChatUI'));
const AboutUs = lazy(() => import('./AIChat/Menu/AboutUs'));
const ServicesPage = lazy(() => import('./AIChat/Menu/ServicesPage'));
const ContactUsPage = lazy(() => import('./AIChat/Menu/ContactUsPage'));
const LoginPage = lazy(() => import('./AIChat/Menu/loginPage'));
const SettingsPage = lazy(() => import('./AIChat/AISettings/settingsPage'));
// const Plans = lazy(() => import('./AIChat/PlansPage'));
const LedLandingPage = lazy(() => import('./lEDLandingPageFolder/LedLandingPage'));

// Define types for Loading Wrapper props
interface LoadingWrapperProps {
  children: React.ReactNode;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// LoadingWrapper component
const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children, setIsLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
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
              <HamburgerMenu header="914AI"/>
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<MainChatUI />} />
                  <Route path="/led" element={<LedLandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactUsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  {/* <Route path="/plans" element={<Plans />} /> */}
                </Routes>
              </main>
            </LoadingWrapper>
          </>
        } />
      </Routes>
    </Suspense>
  </div>

</Router>
</I18nextProvider> 
  );
};

export default App;


