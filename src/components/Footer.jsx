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
              <li><a href="/">{t('home')}</a></li>
              <li><a href="/about">{t('about')}</a></li>
              <li><a href="/projects">{t('projects')}</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t('contactUs')}</h4>
            <p>Email: ronexmudaberkarya@gmail.com</p>
            <p>Phone: +62 812 1000 3060</p>
            <p>Mangga Besar Raya No. 93 DD RT 015/RW 001, Taman Sari, Tangki, Jakarta 11170, Indonesia</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
