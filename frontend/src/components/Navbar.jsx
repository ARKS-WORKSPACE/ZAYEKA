import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import ZayekaLogo from './ZayekaLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['home', 'about', 'menu', 'events', 'reservation'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
          <ZayekaLogo size={42} showText={true} fill="var(--accent-navy)" />
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#menu" 
              className={activeSection === 'menu' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'menu')}
            >
              Menu
            </a>
          </li>
          <li>
            <a 
              href="#events" 
              className={activeSection === 'events' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'events')}
            >
              Events
            </a>
          </li>
          <li>
            <a 
              href="#reservation" 
              className={activeSection === 'reservation' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'reservation')}
            >
              Reservation
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a 
            href="#reservation" 
            className="btn-nav btn-primary"
            onClick={(e) => handleNavClick(e, 'reservation')}
          >
            Book Table
          </a>
          
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#menu" 
              className={activeSection === 'menu' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'menu')}
            >
              Menu
            </a>
          </li>
          <li>
            <a 
              href="#events" 
              className={activeSection === 'events' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'events')}
            >
              Events
            </a>
          </li>
          <li>
            <a 
              href="#reservation" 
              className={activeSection === 'reservation' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'reservation')}
            >
              Reservation
            </a>
          </li>
          <li style={{ marginTop: '1.5rem' }}>
            <a 
              href="#reservation" 
              className="btn-primary" 
              style={{ width: '100%', textAlign: 'center' }}
              onClick={(e) => handleNavClick(e, 'reservation')}
            >
              Book Table
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
