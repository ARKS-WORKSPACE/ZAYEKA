import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, ArrowRight, ArrowLeft, CheckCircle, MapPin, Receipt, Sparkles } from 'lucide-react';
import './Reservation.css';
import { MENU_ITEMS } from './Menu';
import ZayekaQRCode from './ZayekaQRCode';
import ZayekaLogo from './ZayekaLogo';

const TIME_SLOTS = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', 
  '9:00 PM', '9:30 PM', '10:00 PM'
];

const TABLES = [
  { id: 'T1', name: 'Window #1', type: 'Window Side', capacity: 2, status: 'available' },
  { id: 'T2', name: 'Window #2', type: 'Window Side', capacity: 2, status: 'reserved' },
  { id: 'T3', name: 'Grand Hall #3', type: 'Main Hall', capacity: 4, status: 'available' },
  { id: 'T4', name: 'Grand Hall #4', type: 'Main Hall', capacity: 6, status: 'available' },
  { id: 'T5', name: 'Grand Hall #5', type: 'Main Hall', capacity: 4, status: 'reserved' },
  { id: 'T6', name: 'Velvet Booth #6', type: 'Private Booth', capacity: 4, status: 'available' },
  { id: 'T7', name: 'Velvet Booth #7', type: 'Private Booth', capacity: 6, status: 'available' },
  { id: 'T8', name: 'Chef Counter #8', type: 'Chef Counter', capacity: 2, status: 'available' },
  { id: 'T9', name: 'Chef Counter #9', type: 'Chef Counter', capacity: 2, status: 'reserved' },
];

export default function Reservation({ selectedDishes = {} }) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: 2,
    tableId: '',
    name: '',
    email: '',
    phone: '',
    occasion: '',
    specialRequests: ''
  });
  
  const [errors, setErrors] = useState({});
  const [bookingRef, setBookingRef] = useState('');

  // Pre-populate special requests with culinary selections
  useEffect(() => {
    const selectedItems = Object.entries(selectedDishes)
      .map(([id, qty]) => {
        const dish = MENU_ITEMS.find(item => item.id === parseInt(id));
        return dish ? `${dish.name} (x${qty})` : '';
      })
      .filter(Boolean)
      .join(', ');
      
    if (selectedItems) {
      setBookingData(prev => {
        const hasExistingSelection = prev.specialRequests.includes('Selected Dishes:');
        if (hasExistingSelection || !prev.specialRequests.trim()) {
          return {
            ...prev,
            specialRequests: `Selected Dishes: ${selectedItems}`
          };
        }
        return prev;
      });
    }
  }, [selectedDishes]);

  // Get current date string for input limit (min is today)
  const todayStr = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const selectTime = (time) => {
    setBookingData(prev => ({ ...prev, time }));
    if (errors.time) {
      setErrors(prev => ({ ...prev, time: '' }));
    }
  };

  const selectTable = (table) => {
    if (table.status === 'reserved') return;
    setBookingData(prev => ({ ...prev, tableId: table.id }));
    if (errors.tableId) {
      setErrors(prev => ({ ...prev, tableId: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!bookingData.date) newErrors.date = 'Please select a date.';
    if (!bookingData.time) newErrors.time = 'Please select a time slot.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!bookingData.tableId) newErrors.tableId = 'Please select a table on the floor plan.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!bookingData.name.trim()) newErrors.name = 'Name is required.';
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!bookingData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailPattern.test(bookingData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    const phonePattern = /^\+?[0-9\s-]{10,15}$/;
    if (!bookingData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phonePattern.test(bookingData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      // Generate a mock booking reference
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let ref = 'ZYK-';
      for (let i = 0; i < 6; i++) {
        ref += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      // Fetch table specifications
      const tableInfo = TABLES.find(t => t.id === bookingData.tableId);
      
      // Save reservation to local storage and remote DB for the desk dashboard
      const newReservation = {
        ref,
        date: bookingData.date,
        time: bookingData.time,
        guests: bookingData.guests,
        tableId: bookingData.tableId,
        tableName: tableInfo ? tableInfo.name : `Table ${bookingData.tableId}`,
        tableType: tableInfo ? tableInfo.type : 'Standard',
        name: bookingData.name.trim(),
        email: bookingData.email.trim(),
        phone: bookingData.phone.trim(),
        occasion: bookingData.occasion || '',
        specialRequests: bookingData.specialRequests || '',
        dishes: selectedDishes,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      const syncBooking = async () => {
        // Save locally first for instant availability
        let existing = [];
        try {
          existing = JSON.parse(localStorage.getItem('zayeka_reservations') || '[]');
        } catch (err) {}
        existing.push(newReservation);
        localStorage.setItem('zayeka_reservations', JSON.stringify(existing));

        // Asynchronously sync with the cloud database
        try {
          const res = await fetch('https://api.npoint.io/96777d9f150a95155d45');
          let remoteList = [];
          if (res.status === 200) {
            remoteList = await res.json();
            if (!Array.isArray(remoteList)) remoteList = [];
          }
          if (!remoteList.some(r => r.ref === newReservation.ref)) {
            remoteList.push(newReservation);
          }
          await fetch('https://api.npoint.io/96777d9f150a95155d45', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(remoteList)
          });
        } catch (err) {
          console.error('Failed to sync reservation with cloud database:', err);
        }
      };

      syncBooking();
      setBookingRef(ref);
      setStep(4);
    }
  };

  const getSelectedTableInfo = () => {
    return TABLES.find(t => t.id === bookingData.tableId);
  };

  return (
    <section id="reservation" className="reservation-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Secure Your Experience</span>
          <h2 className="section-title">Table Reservation</h2>
        </div>

        <div className="reservation-wizard-container glass-panel">
          {/* Progress Bar */}
          {step < 4 && (
            <div className="wizard-progress">
              <div className={`progress-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span className="node-num">{step > 1 ? '✓' : '1'}</span>
                <span className="node-label">Date & Time</span>
              </div>
              <div className="progress-line" style={{ background: step > 1 ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)' }}></div>
              <div className={`progress-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <span className="node-num">{step > 2 ? '✓' : '2'}</span>
                <span className="node-label">Seating Map</span>
              </div>
              <div className="progress-line" style={{ background: step > 2 ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)' }}></div>
              <div className={`progress-node ${step >= 3 ? 'active' : ''}`}>
                <span className="node-num">3</span>
                <span className="node-label">Your Details</span>
              </div>
            </div>
          )}

          {/* STEP 1: DATE & TIME */}
          {step === 1 && (
            <div className="wizard-step animate-fade-in-up">
              <h3 className="step-title">Select Date & Preferred Time</h3>
              <p className="step-desc">Please choose your dining date and a convenient time slot from our available sessions.</p>
              
              <div className="step-grid">
                <div className="form-group date-picker-group">
                  <label className="form-label">
                    <CalendarIcon size={16} className="label-icon" />
                    Dining Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={todayStr}
                    value={bookingData.date}
                    onChange={handleInputChange}
                    className="form-control date-input"
                  />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>
                
                <div className="form-group select-guests-group">
                  <label className="form-label">
                    <Users size={16} className="label-icon" />
                    Guest Count
                  </label>
                  <div className="guests-selector">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <button
                        key={num}
                        type="button"
                        className={`guest-btn ${bookingData.guests === num ? 'active' : ''}`}
                        onClick={() => setBookingData(prev => ({ ...prev, guests: num }))}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="time-slots-section">
                <label className="form-label">
                  <Clock size={16} className="label-icon" />
                  Available Time Slots
                </label>
                <div className="time-slots-grid">
                  {TIME_SLOTS.map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`time-slot-btn ${bookingData.time === t ? 'active' : ''}`}
                      onClick={() => selectTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>

              <div className="wizard-actions">
                <div></div> {/* Spacer */}
                <button type="button" className="btn-primary" onClick={handleNext}>
                  Select Table
                  <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: FLOOR PLAN TABLE SELECTION */}
          {step === 2 && (
            <div className="wizard-step animate-fade-in-up">
              <h3 className="step-title">Choose Your Dining Space</h3>
              <p className="step-desc">Click on an available table below. Each area offers a distinct dining atmosphere.</p>
              
              <div className="floor-plan-container">
                {/* Floor plan legend */}
                <div className="floor-plan-legend">
                  <div className="legend-item"><span className="legend-dot available"></span> Available</div>
                  <div className="legend-item"><span className="legend-dot reserved"></span> Reserved</div>
                  <div className="legend-item"><span className="legend-dot selected"></span> Your Choice</div>
                </div>

                <div className="floor-plan-grid">
                  {/* Interactive Tables */}
                  {TABLES.map(table => {
                    const isSelected = bookingData.tableId === table.id;
                    const statusClass = table.status === 'reserved' ? 'reserved' : isSelected ? 'selected' : 'available';
                    
                    return (
                      <button
                        key={table.id}
                        type="button"
                        className={`floor-table-card ${statusClass}`}
                        onClick={() => selectTable(table)}
                        disabled={table.status === 'reserved'}
                      >
                        <span className="table-id">{table.id}</span>
                        <span className="table-name">{table.name}</span>
                        <span className="table-capacity">Cap: {table.capacity}</span>
                        <span className="table-type-badge">{table.type}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.tableId && <div className="error-message text-center" style={{ marginTop: '1.5rem' }}>{errors.tableId}</div>}
              </div>

              <div className="selected-table-preview glass-panel">
                {bookingData.tableId ? (
                  <div className="preview-details">
                    <Sparkles className="preview-icon" size={20} />
                    <span>
                      You have selected <strong>{getSelectedTableInfo()?.name}</strong> ({getSelectedTableInfo()?.type}), accommodating up to {getSelectedTableInfo()?.capacity} guests.
                    </span>
                  </div>
                ) : (
                  <span className="preview-placeholder">Please tap on an active dining table to proceed.</span>
                )}
              </div>

              <div className="wizard-actions">
                <button type="button" className="btn-secondary" onClick={handleBack}>
                  <ArrowLeft size={16} style={{ marginRight: '8px' }} />
                  Back
                </button>
                <button type="button" className="btn-primary" onClick={handleNext} disabled={!bookingData.tableId}>
                  Personal Info
                  <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PERSONAL DETAILS */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="wizard-step animate-fade-in-up">
              <h3 className="step-title">Confirm Guest Details</h3>
              <p className="step-desc">Provide your contact details to complete the table reservation process.</p>
              
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="form-control"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="form-control"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    className="form-control"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Special Occasion (Optional)</label>
                  <select
                    name="occasion"
                    value={bookingData.occasion}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">Select Occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business Dinner">Business Dinner</option>
                    <option value="Date Night">Date Night</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Dietary Requests / Notes</label>
                <textarea
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="E.g., wheelchair access, food allergies, quiet table, etc."
                  rows={3}
                  className="form-control"
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>

              <div className="wizard-actions">
                <button type="button" className="btn-secondary" onClick={handleBack}>
                  <ArrowLeft size={16} style={{ marginRight: '8px' }} />
                  Back
                </button>
                <button type="submit" className="btn-primary">
                  Complete Booking
                  <CheckCircle size={16} style={{ marginLeft: '8px' }} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: GORGEOUS TICKET CONFIRMATION */}
          {step === 4 && (
            <div className="wizard-step confirmation-step animate-fade-in-up text-center">
              <div className="success-badge">
                <CheckCircle size={52} className="success-icon" />
              </div>
              <h3 className="success-title">Your Table is Reserved!</h3>
              <p className="success-desc">
                Thank you, {bookingData.name}. We look forward to hosting you. A confirmation email has been sent to {bookingData.email}.
              </p>

              {/* Digital Ticket */}
              <div className="digital-ticket-wrapper">
                <div className="ticket-header">
                  <ZayekaLogo size={32} showText={true} fill="var(--accent-navy)" />
                  <div className="ticket-badge">VIP RESERVATION</div>
                </div>
                
                <div className="ticket-body">
                  <div className="ticket-row">
                    <div className="ticket-col">
                      <span className="t-label">RESERVATION REF</span>
                      <span className="t-val">{bookingRef}</span>
                    </div>
                    <div className="ticket-col">
                      <span className="t-label">GUESTS</span>
                      <span className="t-val">{bookingData.guests} Guests</span>
                    </div>
                  </div>

                  <div className="ticket-row">
                    <div className="ticket-col">
                      <span className="t-label">DATE</span>
                      <span className="t-val">{new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="ticket-col">
                      <span className="t-label">TIME</span>
                      <span className="t-val">{bookingData.time}</span>
                    </div>
                  </div>

                  <div className="ticket-row">
                    <div className="ticket-col">
                      <span className="t-label">ASSIGNED TABLE</span>
                      <span className="t-val">{getSelectedTableInfo()?.name} ({getSelectedTableInfo()?.type})</span>
                    </div>
                    <div className="ticket-col">
                      <span className="t-label">LOCATION</span>
                      <span className="t-val"><MapPin size={12} style={{ verticalAlign: 'middle', marginRight: '3px' }} />Main Arcade, Zayeka</span>
                    </div>
                  </div>

                  {bookingData.occasion && (
                    <div className="ticket-row full-width">
                      <div className="ticket-col">
                        <span className="t-label">OCCASION</span>
                        <span className="t-val-highlight">{bookingData.occasion}</span>
                      </div>
                    </div>
                  )}

                  {/* VIP Culinary Tastings Selection */}
                  {Object.keys(selectedDishes).length > 0 && (
                    <div className="ticket-row full-width">
                      <div className="ticket-col" style={{ width: '100%' }}>
                        <span className="t-label">PRE-SELECTED CULINARY TASTINGS</span>
                        <div className="ticket-selections">
                          <ul className="t-selection-list">
                            {Object.entries(selectedDishes).map(([id, qty]) => {
                              const dish = MENU_ITEMS.find(item => item.id === parseInt(id));
                              if (!dish) return null;
                              return (
                                <li key={dish.id}>
                                  <span>{dish.name}</span>
                                  <span className="item-qty">x{qty}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ticket-footer">
                  {/* Decorative Ticket Cuts */}
                  <div className="ticket-cut-left"></div>
                  <div className="ticket-cut-right"></div>
                  {/* Dynamic Scannable QR Code with Zayeka Logo and Download */}
                  <ZayekaQRCode
                    text={`${window.location.origin}${window.location.pathname}?receipt=reservation&ref=${bookingRef}&name=${encodeURIComponent(bookingData.name)}&email=${encodeURIComponent(bookingData.email)}&phone=${encodeURIComponent(bookingData.phone)}&date=${bookingData.date}&time=${encodeURIComponent(bookingData.time)}&guests=${bookingData.guests}&table=${encodeURIComponent(getSelectedTableInfo()?.name || '')}&tableType=${encodeURIComponent(getSelectedTableInfo()?.type || '')}&occasion=${encodeURIComponent(bookingData.occasion || '')}&requests=${encodeURIComponent(bookingData.specialRequests || '')}&dishes=${encodeURIComponent(JSON.stringify(selectedDishes))}`}
                    size={160}
                    fileName={`zayeka-reservation-${bookingRef}.png`}
                  />
                  <span className="ticket-qr-desc">Scan at reception upon arrival</span>
                </div>
              </div>

              <div className="new-booking-action">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setBookingData({
                      date: '',
                      time: '',
                      guests: 2,
                      tableId: '',
                      name: '',
                      email: '',
                      phone: '',
                      occasion: '',
                      specialRequests: ''
                    });
                    setStep(1);
                  }}
                >
                  <Receipt size={16} style={{ marginRight: '8px' }} />
                  Make Another Reservation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
