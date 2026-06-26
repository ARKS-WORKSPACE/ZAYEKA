import React from 'react';
import ZayekaLogo from './ZayekaLogo';
import { MENU_ITEMS } from './Menu';
import { UPCOMING_EVENTS } from './Events';
import { Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './ReceiptPage.css';

export default function ReceiptPage({ data, onClose }) {
  if (!data) return null;

  const isReservation = data.type === 'reservation';
  const issueDateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // 1. Calculate Line Items
  let items = [];
  let subtotal = 0;

  if (isReservation) {
    // Standard table cover charge/deposit to make it a realistic transaction receipt
    const coverChargePerGuest = 25.00;
    const coverTotal = coverChargePerGuest * data.guests;
    items.push({
      name: `VIP Seating Cover Charge (${data.guests} Guests)`,
      qty: data.guests,
      unitPrice: coverChargePerGuest,
      total: coverTotal,
    });
    subtotal += coverTotal;

    // Add pre-selected dishes if any
    if (data.dishes && Object.keys(data.dishes).length > 0) {
      Object.entries(data.dishes).forEach(([id, qty]) => {
        const dish = MENU_ITEMS.find((item) => item.id === parseInt(id));
        if (dish) {
          const dishTotal = dish.price * qty;
          items.push({
            name: `${dish.name} (Culinary Pre-selection)`,
            qty: qty,
            unitPrice: dish.price,
            total: dishTotal,
          });
          subtotal += dishTotal;
        }
      });
    }
  } else {
    // Event RSVP pass
    const event = UPCOMING_EVENTS.find((ev) => ev.id === parseInt(data.eventId || '0'));
    const eventTitle = data.eventTitle || event?.title || 'Exclusive Culinary Event';
    const eventPrice = data.price || event?.price || 150;
    const ticketTotal = eventPrice * data.guests;

    items.push({
      name: `${eventTitle} - VIP Entry Pass`,
      qty: data.guests,
      unitPrice: eventPrice,
      total: ticketTotal,
    });
    subtotal += ticketTotal;
  }

  // 2. Calculate Taxes & Fees
  const taxRate = 0.08; // 8% Luxury Dining Tax
  const serviceRate = 0.10; // 10% Service Charge
  const tax = subtotal * taxRate;
  const serviceCharge = subtotal * serviceRate;
  const grandTotal = subtotal + tax + serviceCharge;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt-page-container">
      <div className="receipt-actions no-print">
        <button type="button" className="btn-back" onClick={onClose}>
          <ArrowLeft size={16} />
          <span>Return to Site</span>
        </button>
        <button type="button" className="btn-print-action btn-primary" onClick={handlePrint}>
          <Printer size={16} />
          <span>Print Receipt</span>
        </button>
      </div>

      <div className="receipt-paper-card">
        {/* Receipt Header */}
        <div className="receipt-header text-center">
          <div className="receipt-logo-wrapper">
            <ZayekaLogo size={65} showText={true} fill="var(--accent-navy)" />
          </div>
          <p className="receipt-tagline">ARTISANAL INDIAN EXPERIENTIAL</p>
          <p className="receipt-address">12A, Royal Arcade, Galleria Sector, Mumbai - 400001</p>
          <p className="receipt-contact">concierge@zayeka.com | +91 98765 43210</p>
          
          <div className="receipt-badge-success">
            <CheckCircle2 size={16} className="badge-icon" />
            <span>TRANSACTION SUCCESSFUL / PAID</span>
          </div>
        </div>

        <div className="receipt-divider"></div>

        {/* Transaction Meta */}
        <div className="receipt-meta-section">
          <div className="meta-row">
            <span className="meta-label">RECEIPT NO:</span>
            <span className="meta-val highlight">REC-{data.ref}</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">ISSUE DATE:</span>
            <span className="meta-val">{issueDateStr}</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">PAYMENT METHOD:</span>
            <span className="meta-val">VIP PRE-AUTHORIZATION</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">STATUS:</span>
            <span className="meta-val text-success">CONFIRMED</span>
          </div>
        </div>

        <div className="receipt-divider"></div>

        {/* Customer & Booking Details */}
        <div className="receipt-details-section">
          <h3 className="section-title-sm">CUSTOMER DETAILS</h3>
          <div className="details-grid">
            <div className="details-col">
              <span className="d-label">GUEST NAME:</span>
              <span className="d-val">{data.name}</span>
            </div>
            <div className="details-col">
              <span className="d-label">CONTACT PHONE:</span>
              <span className="d-val">{data.phone}</span>
            </div>
            <div className="details-col" style={{ gridColumn: 'span 2' }}>
              <span className="d-label">EMAIL ADDRESS:</span>
              <span className="d-val">{data.email}</span>
            </div>
          </div>
        </div>

        <div className="receipt-divider"></div>

        {/* Booking & Seating details */}
        <div className="receipt-details-section">
          <h3 className="section-title-sm">{isReservation ? 'RESERVATION DETAILS' : 'EVENT PASS DETAILS'}</h3>
          <div className="details-grid">
            {isReservation ? (
              <>
                <div className="details-col">
                  <span className="d-label">BOOKING DATE:</span>
                  <span className="d-val">
                    {new Date(data.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="details-col">
                  <span className="d-label">SESSION TIME:</span>
                  <span className="d-val">{data.time}</span>
                </div>
                <div className="details-col">
                  <span className="d-label">ASSIGNED TABLE:</span>
                  <span className="d-val">{data.table || 'VIP Lounge Seating'}</span>
                </div>
                <div className="details-col">
                  <span className="d-label">TABLE TYPE:</span>
                  <span className="d-val">{data.tableType || 'Standard Seating'}</span>
                </div>
                {data.occasion && (
                  <div className="details-col" style={{ gridColumn: 'span 2' }}>
                    <span className="d-label">SPECIAL OCCASION:</span>
                    <span className="d-val highlight-gold">{data.occasion}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="details-col" style={{ gridColumn: 'span 2' }}>
                  <span className="d-label">EVENT EXPERIENTIAL:</span>
                  <span className="d-val">{data.eventTitle}</span>
                </div>
                <div className="details-col">
                  <span className="d-label">EVENT DATE:</span>
                  <span className="d-val">{data.eventDate}</span>
                </div>
                <div className="details-col">
                  <span className="d-label">EVENT TIME:</span>
                  <span className="d-val">{data.eventTime}</span>
                </div>
              </>
            )}
            {data.requests || data.requirements ? (
              <div className="details-col" style={{ gridColumn: 'span 2' }}>
                <span className="d-label">SPECIAL REQUIREMENTS / NOTES:</span>
                <span className="d-val notes-text">"{data.requests || data.requirements}"</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="receipt-divider"></div>

        {/* Bill Items Breakdown */}
        <div className="receipt-bill-section">
          <h3 className="section-title-sm">ITEMIZED BILLING</h3>
          <table className="bill-table">
            <thead>
              <tr>
                <th className="text-left">DESCRIPTION</th>
                <th className="text-center">QTY</th>
                <th className="text-right">PRICE</th>
                <th className="text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="text-left">{item.name}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="text-right">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="receipt-divider"></div>

        {/* Totals Section */}
        <div className="receipt-totals-section">
          <div className="total-row">
            <span>SUBTOTAL:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>SERVICE CHARGE (10%):</span>
            <span>${serviceCharge.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>LUXURY DINING TAX (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="total-row grand-total">
            <span>TOTAL AMOUNT PAID:</span>
            <span>${grandTotal.toFixed(2)} USD</span>
          </div>
          <div className="total-row balance-row">
            <span>BALANCE DUE:</span>
            <span>$0.00</span>
          </div>
        </div>

        <div className="receipt-divider"></div>

        {/* Receipt Footer */}
        <div className="receipt-footer text-center">
          <p className="thank-you">THANK YOU FOR CHOOSING ZAYEKA</p>
          <p className="concierge-note">Our private culinary hosts are preparing your dining experience. Present this receipt or your QR code at the reception desk upon arrival.</p>
          <div className="barcode-decorative">
            <div className="barcode-line w-1"></div>
            <div className="barcode-line w-2"></div>
            <div className="barcode-line w-1"></div>
            <div className="barcode-line w-3"></div>
            <div className="barcode-line w-1"></div>
            <div className="barcode-line w-2"></div>
            <div className="barcode-line w-4"></div>
            <div className="barcode-line w-2"></div>
            <div className="barcode-line w-1"></div>
            <div className="barcode-line w-3"></div>
            <div className="barcode-line w-2"></div>
            <div className="barcode-line w-1"></div>
          </div>
          <p className="system-tag">POWERED BY ZAYEKA DIGITAL CONCIERGE SYSTEM</p>
        </div>
      </div>
    </div>
  );
}
