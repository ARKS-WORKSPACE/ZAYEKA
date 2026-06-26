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

  // Check URL query parameters for a real-time digital receipt request (e.g. when QR is scanned)
  const [receiptData, setReceiptData] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const receiptType = params.get('receipt');
      if (receiptType) {
        // Parse dishes object if present in parameters
        let parsedDishes = {};
        const dishesParam = params.get('dishes');
        if (dishesParam) {
          parsedDishes = JSON.parse(decodeURIComponent(dishesParam));
        }

        return {
          type: receiptType,
          ref: params.get('ref') || 'GEN-000000',
          name: decodeURIComponent(params.get('name') || ''),
          email: decodeURIComponent(params.get('email') || ''),
          phone: decodeURIComponent(params.get('phone') || ''),
          date: params.get('date') || '',
          time: decodeURIComponent(params.get('time') || ''),
          guests: parseInt(params.get('guests') || '1'),
          table: decodeURIComponent(params.get('table') || ''),
          tableType: decodeURIComponent(params.get('tableType') || ''),
          occasion: decodeURIComponent(params.get('occasion') || ''),
          requests: decodeURIComponent(params.get('requests') || ''),
          dishes: parsedDishes,
          // Event specific parameters
          eventId: params.get('eventId') || '',
          eventTitle: decodeURIComponent(params.get('eventTitle') || ''),
          eventDate: decodeURIComponent(params.get('eventDate') || ''),
          eventTime: decodeURIComponent(params.get('eventTime') || ''),
          price: parseFloat(params.get('price') || '0'),
          requirements: decodeURIComponent(params.get('requirements') || ''),
        };
      }
    } catch (e) {
      console.error('Failed to parse receipt parameters from URL:', e);
    }
    return null;
  });

  // If a receipt is active (e.g. QR scanned), show the dedicated Receipt view
  if (receiptData) {
    return (
      <ReceiptPage
        data={receiptData}
        onClose={() => {
          // Clear query parameters from URL smoothly without reloading
          window.history.replaceState({}, document.title, window.location.pathname);
          setReceiptData(null);
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


