import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsAPI } from '../services/api';
import './Projects.css';

const ProjectsSimple = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching projects from backend...');
        
        const data = await projectsAPI.getAll();
        console.log('Projects fetched:', data);
        console.log('Number of projects:', data.length);
        
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setProjects([]); // No fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
            <h2>Loading projects from database...</h2>
            <p>Connecting to MongoDB Atlas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#f39c12' }}>
            <h2>❌ Backend Connection Failed</h2>
            <p>Error: {error}</p>
            <p>Make sure your backend server is running on http://localhost:5000</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                padding: '1rem 2rem', 
                marginTop: '1rem', 
                background: '#83bc40', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Retry Connection
            </button>
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
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
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
                      {project.status}
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
          
          {/* Debug Info */}
          <div style={{ textAlign: 'center', padding: '2rem', color: '#83bc40', fontSize: '0.9rem' }}>
            <p>✅ Showing {filteredProjects.length} of {projects.length} total projects from MongoDB Atlas</p>
            <p>🔗 Data source: Backend API (http://localhost:5000/api/projects)</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="project-stats">
        <div className="container">
          <h2>{language === 'id' ? 'Statistik Proyek' : 'Project Statistics'}</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{projects.length}</div>
              <div className="stat-label">{language === 'id' ? 'Total Proyek' : 'Total Projects'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{projects.filter(p => p.status === 'completed').length}</div>
              <div className="stat-label">{language === 'id' ? 'Proyek Selesai' : 'Projects Completed'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{[...new Set(projects.map(p => p.category))].length}</div>
              <div className="stat-label">{language === 'id' ? 'Kategori' : 'Categories'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{[...new Set(projects.map(p => p.location))].length}</div>
              <div className="stat-label">{language === 'id' ? 'Lokasi' : 'Locations'}</div>
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

export default ProjectsSimple;
