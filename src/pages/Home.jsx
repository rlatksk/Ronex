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
              <a href="/projects" className="btn btn-primary">{t('ourProjects')}</a>
              <a href="/about" className="btn btn-secondary">{t('learnMore')}</a>
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
            <h2>Ready to Start Your Project?</h2>
            <p>Let's work together to bring your ideas to life.</p>
            <a href="/about" className="btn btn-primary">Get In Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
