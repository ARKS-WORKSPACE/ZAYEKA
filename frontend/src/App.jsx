import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Events from './components/Events';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import EventApplyPage from './components/EventApplyPage';
import ReceiptPage from './components/ReceiptPage';

export default function App() {
  const [selectedDishes, setSelectedDishes] = useState({});
  const [rsvpEvent, setRsvpEvent] = useState(null);

  // Check URL query parameters for a digital receipt reference (e.g., when QR is scanned)
  const [receiptInfo, setReceiptInfo] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      const type = params.get('type') || params.get('receipt'); // 'receipt' is checked for backwards compatibility
      
      if (ref && type) {
        return { ref, type };
      }
    } catch (e) {
      console.error('Failed to parse receipt parameters from URL:', e);
    }
    return null;
  });

  // If a receipt is active (e.g. QR scanned), show the dedicated Receipt view
  if (receiptInfo) {
    return (
      <ReceiptPage
        refCode={receiptInfo.ref}
        type={receiptInfo.type}
        onClose={() => {
          // Clear query parameters from URL smoothly without reloading
          window.history.replaceState({}, document.title, window.location.pathname);
          setReceiptInfo(null);
        }}
      />
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <About />
      <Menu selectedDishes={selectedDishes} setSelectedDishes={setSelectedDishes} />
      <Reservation selectedDishes={selectedDishes} />
      <Events onRequestRsvp={setRsvpEvent} />
      <Testimonials />
      <Footer />

      {/* Dedicated Event RSVP/Application Page Overlay */}
      {rsvpEvent && (
        <EventApplyPage 
          event={rsvpEvent} 
          onClose={() => setRsvpEvent(null)} 
        />
      )}
    </div>
  );
}


