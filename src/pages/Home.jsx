import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Ronex</h1>
            <p className="hero-subtitle">
              Innovative solutions for your business needs. We create exceptional 
              digital experiences that drive growth and success.
            </p>
            <div className="hero-buttons">
              <a href="/projects" className="btn btn-primary">Our Projects</a>
              <a href="/about" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">
              <span>Hero Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>Web Development</h3>
              <p>Modern, responsive websites built with cutting-edge technologies.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Mobile Apps</h3>
              <p>Native and cross-platform mobile applications for iOS and Android.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">☁️</div>
              <h3>Cloud Solutions</h3>
              <p>Scalable cloud infrastructure and deployment solutions.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>Beautiful, user-centered designs that enhance user experience.</p>
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
