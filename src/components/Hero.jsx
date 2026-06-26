import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-overlay"></div>
      
      <div className="hero-content container">
        <div className="hero-text-wrapper animate-fade-in-up">
          <span className="hero-subtitle">Welcome to Zayeka</span>
          <h1 className="hero-title">
            Savor the Symphony <br />
            <span>of Exquisite Flavors</span>
          </h1>
          <p className="hero-description">
            Step into a sanctuary of high-end gastronomy. At Zayeka, we blend time-honored Indian culinary traditions with contemporary global innovations to deliver an unforgettable dining affair.
          </p>
          
          <div className="hero-ctas">
            <a 
              href="#reservation" 
              className="btn-primary"
              onClick={(e) => handleScrollTo(e, 'reservation')}
            >
              <Calendar size={18} style={{ marginRight: '8px' }} />
              Book A Table
            </a>
            <a 
              href="#menu" 
              className="btn-secondary"
              onClick={(e) => handleScrollTo(e, 'menu')}
            >
              Explore Menu
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={(e) => handleScrollTo(e, 'about')}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
