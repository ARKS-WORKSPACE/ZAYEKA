import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const REVIEWS = [
  {
    id: 1,
    name: 'Aarav Mehta',
    role: 'Google Local Guide',
    rating: 5,
    comment: 'Zayeka is a revelation. The Truffle Butter Chicken was an absolute masterclass in flavor balancing—the subtle truffle notes elevated the traditional dish. The dining room has a truly upscale, intimate vibe that is perfect for celebrations.',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'Culinary Journalist',
    rating: 5,
    comment: 'An spectacular fusion of heritage Indian spices and modern European food styling. The Royal Saffron Biryani, crowned with gold leaf, tasted as majestic as it looked. Prompt, highly polished service and beautiful wine pairings.',
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    role: 'Managing Director, V&M Tech',
    rating: 5,
    comment: 'We hosted a VIP corporate dinner here and our guests were thoroughly wowed. The online table reservation map allowed us to select the quietest booths beforehand. The executive concierge went above and beyond to personalize the menu card.',
  }
];

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const autoPlayRef = useRef(null);

  const nextSlide = () => {
    setActiveSlide(prev => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  return (
    <section className="testimonials-section section" onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
      <div className="testimonials-bg-overlay"></div>
      
      <div className="container testimonials-container">
        <div className="section-header">
          <span className="section-subtitle">Guest Testimonials</span>
          <h2 className="section-title">What Our Guests Say</h2>
        </div>

        <div className="slider-wrapper glass-panel">
          <Quote className="quote-icon" size={48} />
          
          <div className="slider-content">
            {REVIEWS.map((review, index) => (
              <div 
                key={review.id} 
                className={`slide-item ${index === activeSlide ? 'active' : ''}`}
                style={{ display: index === activeSlide ? 'block' : 'none' }}
              >
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-icon fill-gold" fill="var(--accent-gold)" />
                  ))}
                </div>
                
                <p className="review-comment">"{review.comment}"</p>
                
                <div className="review-author">
                  <h4 className="author-name">{review.name}</h4>
                  <span className="author-role">{review.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="slider-dots">
            {REVIEWS.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot-btn ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
