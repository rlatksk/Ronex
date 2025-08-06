import ReactCountryFlag from 'react-country-flag';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  // Map language codes to country codes and text
  const displayConfig = {
    en: { code: 'US', name: 'English' },
    id: { code: 'ID', name: 'Indonesia' },
  };

  const nextLanguage = language === 'en' ? 'Bahasa Indonesia' : 'English';

  return (
    <button
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label={`Switch to ${nextLanguage}`}
    >
      {/* Flag Icon from Library */}
      <ReactCountryFlag
        countryCode={displayConfig[language].code}
        svg
        style={{
          width: '1.5em',
          height: '1.5em',
          marginRight: '8px', // Adds space between flag and text
        }}
        aria-hidden="true"
      />

      {/* Language Name */}
      <span className="language-name">
        {displayConfig[language].name}
      </span>
    </button>
  );
};

export default LanguageToggle;