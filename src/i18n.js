import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationHE from './locales/he.json';

const resources = {
  en: {
    translation: translationEN
  },
  he: {
    translation: translationHE
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  if (lng === 'he') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'he';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }
});

export default i18n;
