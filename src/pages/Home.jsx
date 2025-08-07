import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{t('heroTitle')}</h1>
            <p className="hero-subtitle">
              {t('heroSubtitle')}
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">{t('ourProjects')}</Link>
              <Link to="/about" className="btn btn-secondary">{t('learnMore')}</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/RonexLogo.jpeg" alt="Ronex Construction" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">{t('ourServices')}</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>{t('residential')}</h3>
              <p>{t('residentialDesc')}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>{t('commercial')}</h3>
              <p>{t('commercialDesc')}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔨</div>
              <h3>{t('renovation')}</h3>
              <p>{t('renovationDesc')}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>{t('infrastructure')}</h3>
              <p>{t('infrastructureDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>{t('ctaTitle') || 'Ready to Start Your Project?'}</h2>
            <p>{t('ctaDescription') || 'Let\'s work together to bring your ideas to life.'}</p>
            <Link to="/about" className="btn btn-primary">{t('getInTouch') || 'Get In Touch'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
