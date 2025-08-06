import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Ronex</h1>
          <p>Discover our story, mission, and the people behind our success.</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, Ronex began as a small team of passionate developers 
                and designers who believed in the power of technology to transform businesses. 
                What started as a vision to create exceptional digital experiences has grown 
                into a full-service technology company.
              </p>
              <p>
                Today, we work with clients ranging from startups to enterprise companies, 
                helping them navigate the digital landscape and achieve their goals through 
                innovative solutions and cutting-edge technology.
              </p>
            </div>
            <div className="story-image">
              <div className="placeholder-image">
                <span>Company Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <h3>Our Mission</h3>
              <p>
                To empower businesses with innovative technology solutions that drive 
                growth, efficiency, and success in the digital age.
              </p>
            </div>
            <div className="mv-card">
              <h3>Our Vision</h3>
              <p>
                To be the leading technology partner that transforms ideas into 
                reality and helps shape the future of digital innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <span>👨‍💼</span>
              </div>
              <h4>John Doe</h4>
              <p className="member-role">CEO & Founder</p>
              <p className="member-bio">
                Visionary leader with 15+ years in technology and business development.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <span>👩‍💻</span>
              </div>
              <h4>Jane Smith</h4>
              <p className="member-role">CTO</p>
              <p className="member-bio">
                Technical expert specializing in full-stack development and cloud architecture.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <span>👨‍🎨</span>
              </div>
              <h4>Mike Johnson</h4>
              <p className="member-role">Lead Designer</p>
              <p className="member-bio">
                Creative professional focused on user experience and innovative design solutions.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <span>👩‍🔬</span>
              </div>
              <h4>Sarah Wilson</h4>
              <p className="member-role">Project Manager</p>
              <p className="member-bio">
                Experienced project leader ensuring smooth delivery and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">💡</div>
              <h4>Innovation</h4>
              <p>We constantly explore new technologies and approaches to solve complex problems.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h4>Collaboration</h4>
              <p>We believe in the power of teamwork and building strong partnerships with our clients.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h4>Excellence</h4>
              <p>We strive for the highest quality in everything we do, from code to customer service.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h4>Growth</h4>
              <p>We're committed to continuous learning and helping our clients grow their businesses.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
