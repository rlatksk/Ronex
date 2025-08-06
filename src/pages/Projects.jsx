import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: "Jakarta Business Center",
      titleId: "Jakarta Business Center",
      description: "Modern 25-story commercial building with state-of-the-art facilities and sustainable design features.",
      descriptionId: "Gedung komersial modern 25 lantai dengan fasilitas canggih dan fitur desain berkelanjutan.",
      category: "commercial",
      location: "Jakarta, Indonesia",
      duration: "24 months",
      image: "🏢",
      status: "completed"
    },
    {
      id: 2,
      title: "Green Valley Residences",
      titleId: "Green Valley Residences",
      description: "Luxury residential complex with 150 units featuring modern amenities and green building standards.",
      descriptionId: "Kompleks residensial mewah dengan 150 unit yang menampilkan fasilitas modern dan standar bangunan hijau.",
      category: "residential",
      location: "Surabaya, Indonesia",
      duration: "18 months",
      image: "🏠",
      status: "completed"
    },
    {
      id: 3,
      title: "Trans-Java Highway Bridge",
      titleId: "Jembatan Tol Trans-Jawa",
      description: "Major infrastructure project connecting two provinces with a 2.5km cable-stayed bridge.",
      descriptionId: "Proyek infrastruktur besar yang menghubungkan dua provinsi dengan jembatan cable-stayed sepanjang 2,5km.",
      category: "infrastructure",
      location: "Central Java, Indonesia",
      duration: "36 months",
      image: "🌉",
      status: "completed"
    },
    {
      id: 4,
      title: "Bali Resort & Spa",
      titleId: "Bali Resort & Spa",
      description: "Luxury resort renovation with traditional Balinese architecture and modern hospitality facilities.",
      descriptionId: "Renovasi resort mewah dengan arsitektur tradisional Bali dan fasilitas perhotelan modern.",
      category: "renovation",
      location: "Bali, Indonesia",
      duration: "12 months",
      image: "🏖️",
      status: "in-progress"
    },
    {
      id: 5,
      title: "Bandung Tech Hub",
      titleId: "Bandung Tech Hub",
      description: "Innovation center and startup incubator with flexible office spaces and collaboration areas.",
      descriptionId: "Pusat inovasi dan inkubator startup dengan ruang kantor fleksibel dan area kolaborasi.",
      category: "commercial",
      location: "Bandung, Indonesia",
      duration: "15 months",
      image: "�",
      status: "in-progress"
    },
    {
      id: 6,
      title: "Medan Shopping Mall",
      titleId: "Medan Shopping Mall", 
      description: "Large-scale retail and entertainment complex with modern architecture and sustainable energy systems.",
      descriptionId: "Kompleks ritel dan hiburan skala besar dengan arsitektur modern dan sistem energi berkelanjutan.",
      category: "commercial",
      location: "Medan, Indonesia",
      duration: "30 months",
      image: "🛍️",
      status: "planned"
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#83bc40';
      case 'in-progress': return '#f39c12';
      case 'planned': return '#262561';
      default: return '#b7b7b7';
    }
  };

  const { language } = useLanguage();

  return (
    <div className="projects">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <h1>{t('projectsTitle')}</h1>
          <p>{t('projectsSubtitle')}</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="projects-filter">
        <div className="container">
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              {t('allProjects')}
            </button>
            <button 
              className={filter === 'residential' ? 'active' : ''} 
              onClick={() => setFilter('residential')}
            >
              {t('residential')}
            </button>
            <button 
              className={filter === 'commercial' ? 'active' : ''} 
              onClick={() => setFilter('commercial')}
            >
              {t('commercial')}
            </button>
            <button 
              className={filter === 'infrastructure' ? 'active' : ''} 
              onClick={() => setFilter('infrastructure')}
            >
              {t('infrastructure')}
            </button>
            <button 
              className={filter === 'renovation' ? 'active' : ''} 
              onClick={() => setFilter('renovation')}
            >
              {t('renovation')}
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <span className="project-emoji">{project.image}</span>
                  <div 
                    className="project-status" 
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {t(project.status.replace('-', ''))}
                  </div>
                </div>
                <div className="project-content">
                  <h3>{language === 'id' ? project.titleId : project.title}</h3>
                  <p>{language === 'id' ? project.descriptionId : project.description}</p>
                  <div className="project-details">
                    <div className="project-location">📍 {project.location}</div>
                    <div className="project-duration">⏱️ {project.duration}</div>
                  </div>
                  <div className="project-actions">
                    <button className="btn btn-primary">{t('viewDetails')}</button>
                    <button className="btn btn-secondary">{t('getQuote')}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="project-stats">
        <div className="container">
          <h2>Project Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Have a Project in Mind?</h2>
            <p>Let's discuss how we can help bring your ideas to life.</p>
            <Link to="/about" className="btn btn-primary">Start a Project</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
