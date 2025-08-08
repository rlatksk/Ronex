import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsAPI } from '../services/api';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    completedProjects: 0,
    inProgressProjects: 0,
    totalProjects: 0,
    uniqueLocations: 0,
    categories: 0,
    totalDurationMonths: 0
  });
  const { t, language } = useLanguage();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await projectsAPI.getAll();
        setProjects(projectsData);
        
        // Calculate statistics
        const completedProjects = projectsData.filter(project => project.status === 'completed').length;
        const inProgressProjects = projectsData.filter(project => project.status === 'ongoing').length;
        const totalProjects = projectsData.length;
        const uniqueLocations = [...new Set(projectsData.map(project => project.location))].length;
        const categories = [...new Set(projectsData.map(project => project.category))].length;
        
        const totalDurationMonths = projectsData.reduce((total, project) => {
          const durationStr = project.duration.split(' ')[0];
          const months = parseFloat(durationStr);
          return total + months;
        }, 0);

        setStats({
          completedProjects,
          inProgressProjects,
          totalProjects,
          uniqueLocations,
          categories,
          totalDurationMonths
        });
      } catch (error) {
        // Error loading projects - handle silently in production
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#83bc40';
      case 'ongoing': return '#f39c12';
      case 'planned': return '#262561';
      default: return '#b7b7b7';
    }
  };

  if (loading) {
    return (
      <div className="projects">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'white' }}>
            <h2>Loading projects...</h2>
          </div>
        </div>
      </div>
    );
  }

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
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {language === 'id' ? 'Semua' : 'All'}
            </button>
            <button 
              className={`filter-btn ${filter === 'residential' ? 'active' : ''}`}
              onClick={() => setFilter('residential')}
            >
              {language === 'id' ? 'Hunian' : 'Residential'}
            </button>
            <button 
              className={`filter-btn ${filter === 'business' ? 'active' : ''}`}
              onClick={() => setFilter('business')}
            >
              {language === 'id' ? 'Bisnis' : 'Business'}
            </button>
            <button 
              className={`filter-btn ${filter === 'BUMN' ? 'active' : ''}`}
              onClick={() => setFilter('BUMN')}
            >
              BUMN
            </button>
            <button 
              className={`filter-btn ${filter === 'infrastructure' ? 'active' : ''}`}
              onClick={() => setFilter('infrastructure')}
            >
              {language === 'id' ? 'Infrastruktur' : 'Infrastructure'}
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>{language === 'id' ? 'Tidak ada proyek ditemukan' : 'No projects found'}</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div key={project._id || project.id} className="project-card">
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
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="project-stats">
        <div className="container">
          <h2>{language === 'id' ? 'Statistik Proyek' : 'Project Statistics'}</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{stats.completedProjects}</div>
              <div className="stat-label">{language === 'id' ? 'Proyek Selesai' : 'Projects Completed'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.uniqueLocations}</div>
              <div className="stat-label">{language === 'id' ? 'Lokasi Berbeda' : 'Different Locations'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.totalDurationMonths}</div>
              <div className="stat-label">{language === 'id' ? 'Total Bulan Pengerjaan' : 'Total Months of Work'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.categories}</div>
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
