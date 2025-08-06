import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ronex Construction</h3>
            <p>{t('heroSubtitle')}</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">{t('home')}</Link></li>
              <li><Link to="/about">{t('about')}</Link></li>
              <li><Link to="/projects">{t('projects')}</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t('contactUs')}</h4>
            <p>Email: info@ronex.co.id</p>
            <p>Phone: +62 21 123-4567</p>
            <p>Jakarta, Indonesia</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Ronex Construction. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
