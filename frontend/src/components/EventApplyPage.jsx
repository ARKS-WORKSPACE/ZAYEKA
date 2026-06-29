import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, DollarSign, ArrowLeft, CheckCircle, Gift, User, Mail, Phone, Users, MessageSquare } from 'lucide-react';
import { UPCOMING_EVENTS } from './Events';
import './EventApplyPage.css';
import ZayekaQRCode from './ZayekaQRCode';
import ZayekaLogo from './ZayekaLogo';

export default function EventApplyPage({ event, onClose }) {
  // Use the pre-selected event, or fallback to the first one if somehow null
  const [activeEvent, setActiveEvent] = useState(event || UPCOMING_EVENTS[0]);
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    requirements: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [passRef, setPassRef] = useState('');
  const visualColumnRef = useRef(null);

  // Scroll the left column to the top when the active event changes
  useEffect(() => {
    if (visualColumnRef.current) {
      visualColumnRef.current.scrollTop = 0;
    }
  }, [activeEvent]);

  // Update active event if the prop changes
  useEffect(() => {
    if (event) {
      setActiveEvent(event);
    }
  }, [event]);

  // Lock body scroll when the full-screen page is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRsvpForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEventChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const newEvent = UPCOMING_EVENTS.find(ev => ev.id === selectedId);
    if (newEvent) {
      setActiveEvent(newEvent);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!rsvpForm.name.trim()) newErrors.name = 'Name is required.';
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rsvpForm.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailPattern.test(rsvpForm.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    const phonePattern = /^\+?[0-9\s-]{10,15}$/;
    if (!rsvpForm.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phonePattern.test(rsvpForm.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const syncEventRsvp = async () => {
        try {
          const res = await fetch('/api/events/rsvp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventId: activeEvent.id,
              eventTitle: activeEvent.title,
              eventDate: activeEvent.date,
              eventTime: activeEvent.time,
              price: activeEvent.price,
              name: rsvpForm.name.trim(),
              email: rsvpForm.email.trim(),
              phone: rsvpForm.phone.trim(),
              guests: parseInt(rsvpForm.guests || '1'),
              requirements: rsvpForm.requirements || ''
            })
          });

          if (res.ok) {
            const data = await res.json();
            setPassRef(data.ref);
            setIsSubmitted(true);
          } else {
            const errData = await res.json();
            throw new Error(errData.message || 'Server rejected the RSVP request');
          }
        } catch (err) {
          console.error('Failed to sync event RSVP with server:', err);
          alert('Failed to submit RSVP: ' + err.message);
        }
      };

      syncEventRsvp();
    }
  };

  return (
    <div className="event-apply-page animate-fade-in">
      {/* Top Header/Navbar of the dedicated page */}
      <header className="apply-header">
        <div className="apply-header-container">
          <button className="back-btn" onClick={onClose}>
            <ArrowLeft size={18} />
            <span>Back to Experience</span>
          </button>
          
          <div className="apply-brand">
            <ZayekaLogo size={34} showText={true} fill="var(--accent-navy)" />
          </div>
          
          <div className="apply-header-spacer"></div>
        </div>
      </header>

      {/* Main Content Split View */}
      <div className="apply-content-container">
        {!isSubmitted ? (
          <div className="apply-split-layout">
            
            {/* Left Column: Rich Dynamic Showcase */}
            <div className="apply-visual-column" ref={visualColumnRef}>
              <div className="visual-hero-wrapper">
                <img 
                  src={activeEvent.image} 
                  alt={activeEvent.title} 
                  className="visual-hero-img"
                />
                <div className="visual-overlay-gradient"></div>
                <span className="visual-category-badge">{activeEvent.category}</span>
              </div>
              
              <div className="visual-details-card glass-panel">
                <span className="details-subtitle">Exclusive Gathering</span>
                <h2 className="details-title">{activeEvent.title}</h2>
                <p className="details-desc">{activeEvent.description}</p>
                
                <div className="details-meta-grid">
                  <div className="meta-block">
                    <Calendar size={18} className="meta-icon" />
                    <div>
                      <span className="block-label">Date</span>
                      <span className="block-val">{activeEvent.date}</span>
                    </div>
                  </div>
                  
                  <div className="meta-block">
                    <Clock size={18} className="meta-icon" />
                    <div>
                      <span className="block-label">Time</span>
                      <span className="block-val">{activeEvent.time}</span>
                    </div>
                  </div>
                  
                  <div className="meta-block">
                    <DollarSign size={18} className="meta-icon" />
                    <div>
                      <span className="block-label">Pricing</span>
                      <span className="block-val">${activeEvent.price} / Person</span>
                    </div>
                  </div>
                </div>

                <div className="inclusions-section">
                  <h4 className="inclusions-title">
                    <Gift size={14} className="inc-icon" />
                    Connoisseur Inclusions
                  </h4>
                  <p className="inclusions-text">{activeEvent.details}</p>
                </div>
                
                <div className="urgency-banner">
                  <Gift size={16} className="urgency-icon" />
                  <span>Limited seating. Curated concierge invitation booking.</span>
                </div>
              </div>
            </div>

            {/* Right Column: RSVP Application Form */}
            <div className="apply-form-column">
              {/* Mobile-only combined header */}
              <div className="mobile-event-header">
                <div className="mobile-hero-wrapper">
                  <img 
                    src={activeEvent.image} 
                    alt={activeEvent.title} 
                    className="mobile-hero-img" 
                  />
                  <div className="mobile-overlay-gradient"></div>
                  <span className="mobile-category-badge">{activeEvent.category}</span>
                </div>
                <div className="mobile-details-box">
                  <span className="mobile-subtitle">Exclusive Gathering</span>
                  <h2 className="mobile-title">{activeEvent.title}</h2>
                  <p className="mobile-desc">{activeEvent.description}</p>
                  <div className="mobile-meta-row">
                    <div className="mobile-meta-item">
                      <Calendar size={14} className="mobile-meta-icon" />
                      <span>{activeEvent.date}</span>
                    </div>
                    <div className="mobile-meta-item">
                      <Clock size={14} className="mobile-meta-icon" />
                      <span>{activeEvent.time}</span>
                    </div>
                    <div className="mobile-meta-item">
                      <DollarSign size={14} className="mobile-meta-icon" />
                      <span>${activeEvent.price} / Person</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-intro">
                <span className="form-subtitle">Invitational Event RSVP</span>
                <h1 className="form-title">Apply For Passes</h1>
                <p className="form-desc">
                  Secure your presence at our exclusive table. Fill in your details below. Our luxury concierge team will review your application and coordinate ticketing details within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="apply-rsvp-form">
                
                {/* Event Selector - Allows dynamically changing the active event */}
                <div className="form-group">
                  <label className="form-label">Select Culinary Event</label>
                  <div className="select-wrapper">
                    <select 
                      name="eventId" 
                      value={activeEvent.id} 
                      onChange={handleEventChange}
                      className="form-control"
                    >
                      {UPCOMING_EVENTS.map(ev => (
                        <option key={ev.id} value={ev.id}>
                          {ev.title} — ${ev.price} per person
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={rsvpForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      className={`form-control ${errors.name ? 'input-error' : ''}`}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={rsvpForm.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      className={`form-control ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={rsvpForm.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className={`form-control ${errors.phone ? 'input-error' : ''}`}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      <Users size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                      Number of Guests
                    </label>
                    <div className="select-wrapper">
                      <select
                        name="guests"
                        value={rsvpForm.guests}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MessageSquare size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    Special Requests & Preferences
                  </label>
                  <textarea
                    name="requirements"
                    value={rsvpForm.requirements}
                    onChange={handleInputChange}
                    placeholder="E.g., food allergies, dietary restrictions, private table preferences..."
                    rows={4}
                    className="form-control"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary apply-submit-btn">
                    Submit RSVP Application
                    <CheckCircle size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </form>
            </div>

          </div>
        ) : (
          /* Premium Ticket Success State */
          <div className="apply-success-view animate-scale-in">
            <div className="success-header text-center">
              <div className="success-badge">
                <CheckCircle size={48} className="success-icon" />
              </div>
              <h1 className="success-title">Application Received</h1>
              <p className="success-desc">
                Congratulations, <strong>{rsvpForm.name}</strong>. Your invitation request has been logged. A luxury host will contact you shortly at <strong>{rsvpForm.phone}</strong> or <strong>{rsvpForm.email}</strong> to finalize your booking.
              </p>
            </div>

            {/* Premium Digital Pass */}
            <div className="digital-pass-card">
              
              <div className="pass-header">
                <ZayekaLogo size={32} showText={true} fill="var(--accent-navy)" />
                <div className="pass-title-badge">VIP EVENT PASS</div>
              </div>
              
              <div className="pass-body">
                
                <div className="pass-event-title-row">
                  <span className="p-label">EVENT EXPERIENTIAL</span>
                  <h2 className="p-event-title">{activeEvent.title}</h2>
                  <span className="p-category">{activeEvent.category}</span>
                </div>

                <div className="pass-details-grid">
                  <div className="pass-col">
                    <span className="p-label">PASS REFERENCE</span>
                    <span className="p-val highlight">{passRef}</span>
                  </div>
                  <div className="pass-col">
                    <span className="p-label">GUESTS REQUESTED</span>
                    <span className="p-val">{rsvpForm.guests} {rsvpForm.guests === 1 ? 'Person' : 'People'}</span>
                  </div>
                  
                  <div className="pass-col">
                    <span className="p-label">DATE & TIME</span>
                    <span className="p-val">{activeEvent.date} at {activeEvent.time.split(' - ')[0]}</span>
                  </div>
                  <div className="pass-col">
                    <span className="p-label">ESTIMATED TOTAL</span>
                    <span className="p-val">${activeEvent.price * rsvpForm.guests} USD</span>
                  </div>
                </div>

                {rsvpForm.requirements && (
                  <div className="pass-requirements-row">
                    <span className="p-label">SPECIAL DIETARY/SEATING REQUIREMENTS</span>
                    <p className="p-requirements-text">"{rsvpForm.requirements}"</p>
                  </div>
                )}
                
              </div>

              <div className="pass-footer">
                {/* Ticket notches */}
                <div className="pass-notch-left"></div>
                <div className="pass-notch-right"></div>
                
                <div className="pass-qr-wrapper">
                  {/* Dynamic Scannable QR Code with Zayeka Logo and Download */}
                  <ZayekaQRCode
                    text={`${window.location.origin}${window.location.pathname}?ref=${passRef}&type=event`}
                    size={160}
                    fileName={`zayeka-event-pass-${passRef}.png`}
                  />
                  <div className="qr-info">
                    <span className="qr-pass-type">VIP CONNOISSEUR INVITATION</span>
                    <span className="qr-scan-text">Present pass at reception on arrival</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="success-actions text-center">
              <button type="button" className="btn-primary" onClick={onClose}>
                Return to Main Experience
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
