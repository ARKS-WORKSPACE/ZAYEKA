import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './Footer.css';
import ZayekaLogo from './ZayekaLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [timeDetails, setTimeDetails] = useState('');

  useEffect(() => {
    // Check if the restaurant is currently open
    // Open Hours: 5:00 PM - 11:00 PM daily (17:00 - 23:00)
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      
      if (hours >= 17 && hours < 23) {
        setIsOpenNow(true);
        setTimeDetails('Serving Dinner until 11:00 PM');
      } else {
        setIsOpenNow(false);
        setTimeDetails('Opening at 5:00 PM today');
      }
    };

    checkOpenStatus();
    // Check every minute
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        {/* Col 1: Brand & Socials */}
        <div className="footer-col brand-col">
          <a href="#home" className="footer-logo" onClick={handleScrollToTop}>
            <ZayekaLogo size={50} showText={true} fill="var(--accent-navy)" />
          </a>
          <p className="footer-about-text">
            An award-winning luxury dining experience where centuries-old Indian culinary secrets are reimagined with modern artistic innovation.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Instagram" className="social-icon">IG</a>
            <a href="#" aria-label="Facebook" className="social-icon">FB</a>
            <a href="#" aria-label="TripAdvisor" className="social-icon">TA</a>
            <a href="#" aria-label="Yelp" className="social-icon">YP</a>
          </div>
        </div>

        {/* Col 2: Dynamic Hours */}
        <div className="footer-col hours-col">
          <h4 className="footer-col-title">Hours of Dining</h4>
          
          {/* Dynamic Status Badge */}
          <div className={`status-badge ${isOpenNow ? 'open' : 'closed'} glass-panel`}>
            <span className="status-dot"></span>
            <div>
              <span className="status-text">{isOpenNow ? 'OPEN NOW' : 'CLOSED NOW'}</span>
              <span className="status-subtext">{timeDetails}</span>
            </div>
          </div>

          <ul className="hours-list">
            <li>
              <span className="day">Monday - Thursday</span>
              <span className="time">5:00 PM - 11:00 PM</span>
            </li>
            <li>
              <span className="day">Friday - Saturday</span>
              <span className="time">5:00 PM - 11:30 PM</span>
            </li>
            <li>
              <span className="day">Sunday</span>
              <span className="time">5:00 PM - 11:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Newsletter Club */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-col-title">The Culinary Club</h4>
          <p className="newsletter-text">
            Subscribe to receive exclusive invitations to Chef's Tasting Tables, recipe secrets, and priority seasonal bookings.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-wrapper">
                <Mail className="mail-icon" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                  <Send size={16} />
                </button>
              </div>
            </form>
          ) : (
            <div className="newsletter-success animate-fade-in-up">
              <CheckCircle size={18} className="success-icon" />
              <span>Welcome! Check your inbox for our seasonal digest.</span>
            </div>
          )}
        </div>

        {/* Col 4: Contact info */}
        <div className="footer-col contact-col">
          <h4 className="footer-col-title">Contact & Location</h4>
          <ul className="contact-list">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>104 Royal Promenade, Galleria Arcade, Mumbai, IN</span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>+91 22 8765 4321</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>reservations@zayeka.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Zayeka. All Rights Reserved. Crafted for elite gastronomers.
          </p>
          <div className="bottom-links">
            <a href="./desk/index.html" target="_blank" rel="noopener noreferrer">Desk Console</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#" onClick={handleScrollToTop}>Back to Top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
