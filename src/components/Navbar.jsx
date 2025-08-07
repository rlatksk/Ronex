import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          Ronex Muda Berkarya
        </Link>
        
        {/* Desktop Navigation */}
        <div className="nav-right desktop-nav">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                {t('home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                {t('about')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/projects" 
                className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
              >
                {t('projects')}
              </Link>
            </li>
          </ul>
          <LanguageToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          <LanguageToggle />
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          {/* Close Button */}
          <button 
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
            </svg>
          </button>
          
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item">
              <Link 
                to="/" 
                className={`mobile-menu-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="mobile-menu-icon">🏠</span>
                <span className="mobile-menu-text">{t('home')}</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link 
                to="/about" 
                className={`mobile-menu-link ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="mobile-menu-icon">ℹ️</span>
                <span className="mobile-menu-text">{t('about')}</span>
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link 
                to="/projects" 
                className={`mobile-menu-link ${location.pathname === '/projects' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="mobile-menu-icon">🏗️</span>
                <span className="mobile-menu-text">{t('projects')}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Backdrop */}
        {isMenuOpen && (
          <div className="mobile-menu-backdrop" onClick={closeMenu}></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
