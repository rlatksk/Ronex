import ReactCountryFlag from 'react-country-flag';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  // Map language codes to country codes and text
  const displayConfig = {
    id: { code: 'US', name: 'English' },
    en: { code: 'ID', name: 'Indonesia' },
  };

  const nextLanguage = language === 'en' ? 'English' : 'Bahasa Indonesia';

  return (
    <button
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label={`Switch to ${nextLanguage}`}
      title={`Switch to ${nextLanguage}`}
    >
      {/* Flag Icon from Library */}
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