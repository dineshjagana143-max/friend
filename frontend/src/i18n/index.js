import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources, supportedLanguages } from './translations';

const savedLang = localStorage.getItem('bestiverse_lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Apply document direction (RTL for Arabic)
export function updateDocumentDirection(langCode) {
  const currentLang = supportedLanguages.find(l => l.code === langCode);
  const dir = currentLang && currentLang.dir === 'rtl' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = langCode;
}

updateDocumentDirection(savedLang);

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('bestiverse_lang', lng);
  updateDocumentDirection(lng);
});

export default i18n;
