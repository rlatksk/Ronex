import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsData, getProjectStats } from '../data/projectsData';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();

  const projects = projectsData;

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

  // Calculate dynamic statistics using the shared utility function
  const {
    completedProjects,
    inProgressProjects,
    totalProjects,
    uniqueLocations,
    categories,
    totalDurationMonths
  } = getProjectStats(projects);

  return (
    <div className="projects">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <h1>{t('projectsTitle')}</h1>
          <p>{t('projectsSubtitle')}</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} className="project-img" />
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
          <h2>{language === 'id' ? 'Statistik Proyek' : 'Project Statistics'}</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{completedProjects}</div>
              <div className="stat-label">{language === 'id' ? 'Proyek Selesai' : 'Projects Completed'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{uniqueLocations}</div>
              <div className="stat-label">{language === 'id' ? 'Lokasi Berbeda' : 'Different Locations'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{totalDurationMonths}</div>
              <div className="stat-label">{language === 'id' ? 'Total Bulan Pengerjaan' : 'Total Months of Work'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{categories}</div>
              <div className="stat-label">{language === 'id' ? 'Kategori Proyek' : 'Project Categories'}</div>
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
