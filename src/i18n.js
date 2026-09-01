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

const LANGUAGE_STORAGE_KEY = 'ozzy_backoffice_language';
const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
const initialLanguage = storedLanguage === 'he' ? 'he' : 'en';

function updateDocumentLanguage(language) {
  const isHebrew = language === 'he';

  document.documentElement.dir = isHebrew ? 'rtl' : 'ltr';
  document.documentElement.lang = isHebrew ? 'he' : 'en';
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (language) => {
  const supportedLanguage = language === 'he' ? 'he' : 'en';

  localStorage.setItem(LANGUAGE_STORAGE_KEY, supportedLanguage);
  updateDocumentLanguage(supportedLanguage);
});

updateDocumentLanguage(initialLanguage);

export default i18n;
