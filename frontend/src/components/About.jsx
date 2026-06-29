import React from 'react';
import { Award, Heart, ShieldCheck } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="grid-2">
          {/* Left Column: Text Content */}
          <div className="about-content-wrapper">
            <span className="section-subtitle">Our Story</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Crafting Culinary Masterpieces</h2>
            
            <p className="about-lead">
              Founded in 2020, Zayeka emerged from a passion to redefine fine dining by fusing traditional Indian flavors with contemporary culinary techniques.
            </p>
            
            <p className="about-text">
              Every dish we serve is a testament to our dedication. We source the finest organic local ingredients and premium imported spices, treating them with the respect they deserve. Our kitchen is a laboratory where centuries-old recipes from Royal Mughal courts and regional Indian kitchens are deconstructed, elevated, and presented as modern art.
            </p>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <a href="#menu" className="text-link" onClick={(e) => {
                e.preventDefault();
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Learn more about our story.
              </a>
            </div>
            
            <div className="chef-quote glass-panel">
              <p className="quote-text">
                "Gastronomy is a sensory journey. At Zayeka, we don't just feed the body; we evoke memories, spark emotions, and celebrate the rich, diverse tapestry of Indian spice heritage."
              </p>
              <div className="chef-info">
                <div className="chef-line"></div>
                <div>
                  <h4 className="chef-name">Rohan Malhotra</h4>
                  <span className="chef-title">Executive Chef & Co-founder</span>
                </div>
              </div>
            </div>

            {/* Micro Pillars */}
            <div className="pillars-grid">
              <div className="pillar-item">
                <div className="pillar-icon-wrapper">
                  <Heart className="pillar-icon" size={20} />
                </div>
                <h5>Crafted with Love</h5>
              </div>
              <div className="pillar-item">
                <div className="pillar-icon-wrapper">
                  <Award className="pillar-icon" size={20} />
                </div>
                <h5>Award-Winning Chef</h5>
              </div>
              <div className="pillar-item">
                <div className="pillar-icon-wrapper">
                  <ShieldCheck className="pillar-icon" size={20} />
                </div>
                <h5>Premium Quality</h5>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Image Showcase */}
          <div className="about-visuals-wrapper">
            <div className="visuals-grid">
              <div className="grid-item item-large glow-gold-hover">
                <img src="/assets/hero_interior.png" alt="Zayeka Dining Hall" />
                <div className="image-caption">
                  <h4>The Dining Sanctuary</h4>
                  <p>Luxurious ambience for intimate gatherings</p>
                </div>
              </div>
              <div className="grid-item item-small-1 glow-gold-hover">
                <img src="/assets/signature_appetizer.png" alt="Signature Appetizer" />
                <div className="image-caption">
                  <h4>Tandoori Paneer Tikka</h4>
                  <p>Modern plated skewers with micro-greens</p>
                </div>
              </div>
              <div className="grid-item item-small-2 glow-gold-hover">
                <img src="/assets/signature_main.png" alt="Signature Main Course" />
                <div className="image-caption">
                  <h4>Saffron Royal Biryani</h4>
                  <p>Infused with saffron and edible gold leaf</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
