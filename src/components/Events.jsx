import React from 'react';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import './Events.css';

export const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Chef Rohan\'s Masterclass',
    category: 'Workshop',
    date: 'July 12, 2026',
    time: '2:00 PM - 5:00 PM',
    price: 95,
    image: '/assets/signature_appetizer.png',
    description: 'An exclusive, hands-on workshop led by Executive Chef Rohan. Learn the secrets of modern plating aesthetics and artisanal spice blending.',
    details: 'Includes ingredients, individual cooking stations, wine tasting, and a custom kitchen apron.'
  },
  {
    id: 2,
    title: 'Sufi & Ghazal Soiree',
    category: 'Live Music & Dining',
    date: 'July 20, 2026',
    time: '7:30 PM - 11:00 PM',
    price: 120,
    image: '/assets/hero_interior.png',
    description: 'An enchanting evening of live acoustic Sufi music and soulful Urdu ghazals. Enjoy a premium, curated 5-course tasting menu paired with boutique wines.',
    details: 'Limited seating. Private booth dining options are available. Smart elegant attire recommended.'
  },
  {
    id: 3,
    title: 'The Royal Maharaja Feast',
    category: 'Gala Dinner',
    date: 'August 05, 2026',
    time: '8:00 PM - 11:30 PM',
    price: 150,
    image: '/assets/signature_main.png',
    description: 'Experience a grand celebration of heritage culinary arts. A banquet presenting deconstructed classical dishes inspired by the royal kitchens of India.',
    details: 'Includes mock-cocktail reception, premium seating, live sitar performance, and a take-home spice box gift.'
  }
];

export default function Events({ onRequestRsvp }) {
  return (
    <section id="events" className="events-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Intimate Culinary Gatherings</span>
          <h2 className="section-title">Upcoming Events</h2>
        </div>

        <div className="grid-3">
          {UPCOMING_EVENTS.map(event => (
            <div key={event.id} className="event-card glass-panel glow-gold-hover animate-fade-in-up">
              <div className="event-img-wrapper">
                <img src={event.image} alt={event.title} />
                <span className="event-category-badge">{event.category}</span>
              </div>
              
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                
                <div className="event-meta">
                  <div className="meta-item">
                    <Calendar size={14} className="meta-icon" />
                    <span>{event.date}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={14} className="meta-icon" />
                    <span>{event.time}</span>
                  </div>
                  <div className="meta-item">
                    <DollarSign size={14} className="meta-icon" />
                    <span>${event.price} per person</span>
                  </div>
                </div>

                <p className="event-description">{event.description}</p>
                
                <button 
                  type="button" 
                  className="btn-secondary event-btn-action"
                  onClick={() => onRequestRsvp && onRequestRsvp(event)}
                >
                  Request RSVP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

