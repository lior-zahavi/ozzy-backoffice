import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LANGUAGES = [
  { code: 'he', label: 'עברית - HE', country: 'il' },
  { code: 'en', label: 'English - EN', country: 'us' },
];

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangCode = i18n.language || 'en';
  const currentLang = LANGUAGES.find(l => l.code === currentLangCode) || LANGUAGES[1];

  const handleToggle = () => setIsOpen(!isOpen);

  const selectLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-switcher-button"
        type="button"
        onClick={handleToggle}
        aria-label={t('backoffice.common.selectLanguage')}
        aria-expanded={isOpen}
      >
        <img
          src={`https://flagcdn.com/w20/${currentLang.country}.png`}
          srcSet={`https://flagcdn.com/w40/${currentLang.country}.png 2x`}
          alt={currentLang.code}
          className="lang-flag"
        />
        <span className="lang-code">{currentLang.code.toUpperCase()}</span>
        <span className="material-symbols-outlined lang-caret">
          arrow_drop_down
        </span>
      </button>

      {isOpen && (
        <ul className="language-dropdown">
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                className={`language-option ${currentLangCode === lang.code ? 'active' : ''}`}
                onClick={() => selectLanguage(lang.code)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
