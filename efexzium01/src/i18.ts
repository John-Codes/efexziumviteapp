import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    lng: navigator.language.split('-')[0], // Use browser language
    fallbackLng: 'en', // Fallback to English if translation not available
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;