import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsAPI } from '../services/api';
import LazyImage from '../components/LazyImage';
import LoadingSpinner from '../components/LoadingSpinner';
import { throttle } from '../utils/performanceUtils';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 8 });
  const containerRef = useRef();
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
        setError(null);
        
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
        setError(error.message || 'Failed to load projects');
        setProjects([]); // Reset projects on error
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filtered projects
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Virtual scrolling logic
  const updateVisibleProjects = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { scrollTop, clientHeight } = container;
    const itemHeight = 400; // Approximate height of each project card
    const itemsPerRow = Math.floor(container.clientWidth / 300) || 4; // Dynamic based on screen width
    
    const visibleRows = Math.ceil(clientHeight / itemHeight);
    const scrolledRows = Math.floor(scrollTop / itemHeight);
    
    const start = Math.max(0, (scrolledRows - 1) * itemsPerRow);
    const end = Math.min(filteredProjects.length, (scrolledRows + visibleRows + 2) * itemsPerRow);
    
    setVisibleRange({ start, end });
  }, [filteredProjects.length]);

  // Update visible projects when range or filter changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      setVisibleProjects(filteredProjects.slice(visibleRange.start, visibleRange.end));
    }
  }, [filteredProjects, visibleRange]);

  // Handle scroll for virtual scrolling with throttling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = throttle(() => {
      updateVisibleProjects();
    }, 16); // ~60fps

    container.addEventListener('scroll', handleScroll, { passive: true });
    updateVisibleProjects(); // Initial call

    return () => container.removeEventListener('scroll', handleScroll);
  }, [updateVisibleProjects]);

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
        {/* Hero Section - Show even while loading */}
        <section className="projects-hero">
          <div className="container">
            <h1>{t('projectsTitle')}</h1>
            <p>{t('projectsSubtitle')}</p>
          </div>
        </section>

        {/* Loading Spinner */}
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="projects">
        {/* Hero Section */}
        <section className="projects-hero">
          <div className="container">
            <h1>{t('projectsTitle')}</h1>
            <p>{t('projectsSubtitle')}</p>
          </div>
        </section>

        {/* Error Message */}
        <section className="projects-grid-section">
          <div className="container">
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              color: '#f39c12',
              background: 'rgba(243, 156, 18, 0.1)',
              borderRadius: '8px',
              margin: '2rem 0'
            }}>
              <h3>⚠️ Unable to Load Projects</h3>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  padding: '1rem 2rem',
                  background: '#83bc40',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginTop: '1rem'
                }}
              >
                {language === 'id' ? 'Coba Lagi' : 'Try Again'}
              </button>
            </div>
          </div>
        </section>
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
        <div 
          className="container" 
          ref={containerRef}
          style={{ 
            height: filteredProjects.length > 8 ? '80vh' : 'auto', 
            overflowY: filteredProjects.length > 8 ? 'auto' : 'visible' 
          }}
        >
          {filteredProjects.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              color: '#b3b3b3',
              background: 'rgba(45, 45, 45, 0.5)',
              borderRadius: '8px',
              margin: '2rem 0'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <h3>{language === 'id' ? 'Tidak ada proyek ditemukan' : 'No projects found'}</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                {language === 'id' 
                  ? 'Coba ubah filter untuk melihat proyek lainnya' 
                  : 'Try changing the filter to see other projects'
                }
              </p>
              <button 
                onClick={() => setFilter('all')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#83bc40',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {language === 'id' ? 'Tampilkan Semua' : 'Show All Projects'}
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {/* Virtual scrolling: only render visible projects */}
              {(filteredProjects.length <= 8 ? filteredProjects : visibleProjects).map(project => (
                <div key={project._id || project.id} className="project-card">
                  <div className="project-image">
                    <LazyImage 
                      src={project.image} 
                      alt={project.title} 
                      className="project-img"
                    />
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
