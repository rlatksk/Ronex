import { useLanguage } from '../contexts/LanguageContext';
import { projectsData, getProjectStats } from '../data/projectsData';
import './About.css';

const About = () => {
  const { t } = useLanguage();

  // Get dynamic project statistics
  const { completedProjects } = getProjectStats(projectsData);

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>{t('aboutTitle')}</h1>
          <p>{t('aboutSubtitle')}</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>{t('aboutTitle')}</h2>
              <p>{t('aboutDescription')}</p>
            </div>
            <div className="story-image">
              <img src="/RonexLogo.jpeg" alt="Ronex Construction" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>{t('ourValues')}</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>{t('quality')}</h3>
              <p>{t('qualityDesc')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>{t('safety')}</h3>
              <p>{t('safetyDesc')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>{t('innovation')}</h3>
              <p>{t('innovationDesc')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>{t('sustainability')}</h3>
              <p>{t('sustainabilityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{completedProjects}</div>
              <div className="stat-label">{'Projects Completed'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">{'Years Experience'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">{'Happy Clients'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">{'Expert Workers'}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
