import ReactCountryFlag from 'react-country-flag';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  // Map language codes to country codes and text
  const displayConfig = {
    en: { code: 'ID', name: 'Bahasa Indonesia' },
    id: { code: 'US', name: 'English' }
  };

  const nextLanguage = language === 'en' ? 'Bahasa Indonesia' : 'English';

  return (
    <button
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label={`Switch to ${nextLanguage}`}
      title={`Switch to ${nextLanguage}`}
    >
      <ReactCountryFlag
        countryCode={displayConfig[language].code}
        svg
        style={{
          width: '1.5em',
          height: '1.5em',
        }}
        aria-hidden="true"
      />
    </button>
  );
};

export default LanguageToggle;