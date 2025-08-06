import { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern, responsive e-commerce website built with React and Node.js featuring payment integration and inventory management.",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "🛒",
      status: "completed"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication and real-time transaction monitoring.",
      category: "mobile",
      technologies: ["React Native", "Firebase", "Redux"],
      image: "📱",
      status: "completed"
    },
    {
      id: 3,
      title: "Cloud Analytics Dashboard",
      description: "Real-time analytics dashboard for monitoring business metrics with interactive charts and data visualization.",
      category: "web",
      technologies: ["Vue.js", "D3.js", "AWS", "PostgreSQL"],
      image: "📊",
      status: "completed"
    },
    {
      id: 4,
      title: "IoT Device Management",
      description: "Comprehensive platform for managing and monitoring IoT devices with automated alerts and reporting.",
      category: "web",
      technologies: ["Angular", "Python", "Docker", "MQTT"],
      image: "🔧",
      status: "in-progress"
    },
    {
      id: 5,
      title: "Social Media App",
      description: "Cross-platform social media application with real-time messaging and content sharing features.",
      category: "mobile",
      technologies: ["Flutter", "Dart", "GraphQL"],
      image: "💬",
      status: "in-progress"
    },
    {
      id: 6,
      title: "AI-Powered CRM",
      description: "Customer relationship management system enhanced with machine learning for predictive analytics.",
      category: "web",
      technologies: ["Python", "TensorFlow", "Django", "React"],
      image: "🤖",
      status: "planning"
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#27ae60';
      case 'in-progress': return '#f39c12';
      case 'planning': return '#3498db';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="projects">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <h1>Our Projects</h1>
          <p>Explore our portfolio of innovative solutions and successful client projects.</p>
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
              All Projects
            </button>
            <button 
              className={filter === 'web' ? 'active' : ''} 
              onClick={() => setFilter('web')}
            >
              Web Development
            </button>
            <button 
              className={filter === 'mobile' ? 'active' : ''} 
              onClick={() => setFilter('mobile')}
            >
              Mobile Apps
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
                    {project.status.replace('-', ' ')}
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <button className="btn btn-primary">View Details</button>
                    <button className="btn btn-secondary">Live Demo</button>
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
            <a href="/about" className="btn btn-primary">Start a Project</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
