// Zayeka Restaurant Desk Portal Logic - Vanilla ES6 JS with Cloud Syncing

const TABLES = [
  { id: 'T1', name: 'Window #1', type: 'Window Side', capacity: 2 },
  { id: 'T2', name: 'Window #2', type: 'Window Side', capacity: 2 },
  { id: 'T3', name: 'Grand Hall #3', type: 'Main Hall', capacity: 4 },
  { id: 'T4', name: 'Grand Hall #4', type: 'Main Hall', capacity: 6 },
  { id: 'T5', name: 'Grand Hall #5', type: 'Main Hall', capacity: 4 },
  { id: 'T6', name: 'Velvet Booth #6', type: 'Private Booth', capacity: 4 },
  { id: 'T7', name: 'Velvet Booth #7', type: 'Private Booth', capacity: 6 },
  { id: 'T8', name: 'Chef Counter #8', type: 'Chef Counter', capacity: 2 },
  { id: 'T9', name: 'Chef Counter #9', type: 'Chef Counter', capacity: 2 },
];

const getRelativeDate = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

const MENU_ITEMS = [
  { id: 1, name: 'Saffron Butter Chicken', price: 28 },
  { id: 2, name: 'Truffle Galouti Kebab', price: 24 },
  { id: 3, name: 'Rosemary Garlic Naan', price: 6 },
  { id: 4, name: 'Vedic Lentil Dhal', price: 18 },
  { id: 5, name: 'Cardamom Rose Kulfi', price: 12 }
];

function getDishName(dishId) {
  const item = MENU_ITEMS.find(m => m.id === parseInt(dishId));
  return item ? item.name : `Dish #${dishId}`;
}

const API_RESERVATIONS = '/api/reservations';
const API_EVENTS = '/api/events/rsvp';

// Mock Initial Data
const MOCK_RESERVATIONS = [
  {
    ref: 'ZYK-V9B8N2',
    date: getRelativeDate(0),
    time: '7:00 PM',
    guests: 2,
    tableId: 'T1',
    tableName: 'Window #1',
    tableType: 'Window Side',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9820012345',
    occasion: 'Date Night',
    specialRequests: 'Window table requested, flower bouquet surprise',
    dishes: { 1: 1, 3: 2 },
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    ref: 'ZYK-H6Y7T1',
    date: getRelativeDate(0),
    time: '8:30 PM',
    guests: 4,
    tableId: 'T3',
    tableName: 'Grand Hall #3',
    tableType: 'Main Hall',
    name: 'Sunita Patel',
    email: 'sunita.patel@gmail.com',
    phone: '9769055443',
    occasion: 'Birthday',
    specialRequests: 'Allergic to nuts, wheelchair access needed',
    dishes: { 2: 2, 5: 1 },
    status: 'Checked In',
    createdAt: new Date().toISOString()
  },
  {
    ref: 'ZYK-R4W2Q9',
    date: getRelativeDate(1),
    time: '6:30 PM',
    guests: 2,
    tableId: 'T8',
    tableName: 'Chef Counter #8',
    tableType: 'Chef Counter',
    name: 'Rohan Malhotra',
    email: 'rohan.malhotra@yahoo.com',
    phone: '9920188776',
    occasion: 'Anniversary',
    specialRequests: 'Greeting card at the table please',
    dishes: {},
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    ref: 'ZYK-K9L8P4',
    date: getRelativeDate(-1),
    time: '9:00 PM',
    guests: 2,
    tableId: 'T9',
    tableName: 'Chef Counter #9',
    tableType: 'Chef Counter',
    name: 'Lisa Wang',
    email: 'lisa.wang@outlook.com',
    phone: '9167344556',
    occasion: '',
    specialRequests: 'Quiet spot',
    dishes: { 1: 2 },
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    ref: 'ZYK-X5Z6M8',
    date: getRelativeDate(2),
    time: '7:30 PM',
    guests: 6,
    tableId: 'T7',
    tableName: 'Velvet Booth #7',
    tableType: 'Private Booth',
    name: 'Vikram Singhania',
    email: 'vsinghania@corporation.in',
    phone: '9811223344',
    occasion: 'Business Dinner',
    specialRequests: 'Corporate billing, privacy screen',
    dishes: { 3: 6, 4: 3 },
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  }
];

const MOCK_EVENTS = [
  {
    ref: 'ZYK-EV-A2C4E6',
    eventId: 1,
    eventTitle: 'Saffron & Gold Sommelier Night',
    eventDate: 'July 15, 2026',
    eventTime: '7:30 PM',
    price: 180,
    name: 'Priya Iyer',
    email: 'priya.iyer@exclusive.com',
    phone: '9833055442',
    guests: 2,
    requirements: 'Vegetarian wine pairing menu preferred',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    ref: 'ZYK-EV-X9Y8Z7',
    eventId: 2,
    eventTitle: 'Vedic Spice Masterclass',
    eventDate: 'July 18, 2026',
    eventTime: '11:00 AM',
    price: 120,
    name: 'Michael Chang',
    email: 'm.chang@culinaryschool.com',
    phone: '9122334455',
    guests: 1,
    requirements: 'Provide notebook and spice kit',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    ref: 'ZYK-EV-Q1W2E3',
    eventId: 3,
    eventTitle: 'Royal Diwan Banquet',
    eventDate: 'July 24, 2026',
    eventTime: '8:00 PM',
    price: 250,
    name: 'Ananya Sen',
    email: 'ananya.sen@artscouncil.in',
    phone: '9892011223',
    guests: 4,
    requirements: 'Peshawari-style seating, non-alcoholic cocktail options',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  }
];

// App State
let reservations = [];
let eventRsvps = [];
let currentTab = 'tables';
let searchQuery = '';
let statusFilter = 'ALL';
let sortOption = 'date-asc';

// Load Data from Remote DB
async function loadData() {
  // Load Menu first to resolve names dynamically
  try {
    const menuRes = await fetch('/api/menu');
    if (menuRes.ok) {
      const menuData = await menuRes.json();
      if (Array.isArray(menuData) && menuData.length > 0) {
        MENU_ITEMS.length = 0;
        menuData.forEach(item => MENU_ITEMS.push(item));
      }
    }
  } catch (err) {
    console.error('Failed to load menu items:', err);
  }

  try {
    const res = await fetch(API_RESERVATIONS);
    if (res.status === 200) {
      reservations = await res.json();
      if (!Array.isArray(reservations)) reservations = [];
      
      // If remote list is empty, seed it with mock reservations
      if (reservations.length === 0) {
        reservations = MOCK_RESERVATIONS;
        await syncReservations(reservations);
      } else {
        localStorage.setItem('zayeka_reservations', JSON.stringify(reservations));
      }
    } else {
      reservations = JSON.parse(localStorage.getItem('zayeka_reservations') || '[]');
    }
  } catch (e) {
    console.warn('Network error loading reservations, reading local storage', e);
    reservations = JSON.parse(localStorage.getItem('zayeka_reservations') || '[]');
  }

  try {
    const res = await fetch(API_EVENTS);
    if (res.status === 200) {
      eventRsvps = await res.json();
      if (!Array.isArray(eventRsvps)) eventRsvps = [];
      
      // If remote list is empty, seed it with mock events
      if (eventRsvps.length === 0) {
        eventRsvps = MOCK_EVENTS;
        await syncEventRsvps(eventRsvps);
      } else {
        localStorage.setItem('zayeka_event_rsvps', JSON.stringify(eventRsvps));
      }
    } else {
      eventRsvps = JSON.parse(localStorage.getItem('zayeka_event_rsvps') || '[]');
    }
  } catch (e) {
    console.warn('Network error loading event RSVPs, reading local storage', e);
    eventRsvps = JSON.parse(localStorage.getItem('zayeka_event_rsvps') || '[]');
  }
}

// Sync utilities
async function syncReservations(list) {
  localStorage.setItem('zayeka_reservations', JSON.stringify(list));
  try {
    await fetch(API_RESERVATIONS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    });
  } catch (e) {
    console.error('Failed to push reservations to cloud DB:', e);
  }
}

async function syncEventRsvps(list) {
  localStorage.setItem('zayeka_event_rsvps', JSON.stringify(list));
  try {
    await fetch(API_EVENTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    });
  } catch (e) {
    console.error('Failed to push event RSVPs to cloud DB:', e);
  }
}

// Save Data (wrapper for mutations)
async function saveData() {
  await syncReservations(reservations);
  await syncEventRsvps(eventRsvps);
}

// Render Engine
function renderStats() {
  const confirmedOrCheckedInTables = reservations.filter(r => r.status !== 'Cancelled');
  const confirmedOrCheckedInEvents = eventRsvps.filter(e => e.status !== 'Cancelled');
  
  document.getElementById('stat-total-bookings').textContent = confirmedOrCheckedInTables.length + confirmedOrCheckedInEvents.length;

  const tableGuests = confirmedOrCheckedInTables.reduce((sum, r) => sum + parseInt(r.guests || 0), 0);
  const eventGuests = confirmedOrCheckedInEvents.reduce((sum, e) => sum + parseInt(e.guests || 0), 0);
  document.getElementById('stat-total-guests').textContent = tableGuests + eventGuests;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = confirmedOrCheckedInTables.filter(r => r.date === todayStr).length;
  document.getElementById('stat-today-bookings').textContent = todayBookings;

  document.getElementById('stat-event-rsvps').textContent = confirmedOrCheckedInEvents.length;
}

function renderTablesList(filtered) {
  const tbody = document.getElementById('tbody-tables');
  tbody.innerHTML = '';
  
  if (filtered.length === 0) {
    document.getElementById('empty-tables').style.display = 'flex';
    return;
  }
  document.getElementById('empty-tables').style.display = 'none';

  filtered.forEach(res => {
    const tr = document.createElement('tr');
    
    let dishesHtml = '';
    if (res.dishes && Object.keys(res.dishes).length > 0) {
      dishesHtml = Object.entries(res.dishes)
        .map(([id, qty]) => `<span class="tasting-item">${getDishName(id)} (x${qty})</span>`)
        .join(' ');
    } else {
      dishesHtml = '<span class="text-muted" style="font-size:0.75rem;">None selected</span>';
    }

    const occasionHtml = res.occasion 
      ? `<span class="occasion-badge"><i data-lucide="gift"></i> ${res.occasion}</span>` 
      : '<span class="text-muted">-</span>';

    // Clean up specialRequests by removing the redundant "Selected Dishes: ..." list
    let cleanWishes = res.specialRequests || '';
    if (cleanWishes.includes('Selected Dishes:')) {
      cleanWishes = cleanWishes
        .replace(/Selected Dishes:\s*[^|]*/g, '')
        .replace(/^\|\s*Notes:\s*/, '')
        .trim();
    }

    const wishesHtml = cleanWishes 
      ? `<div class="guest-meta" style="max-width:220px; font-style:italic;">"${cleanWishes}"</div>` 
      : '';

    const statusClass = res.status.toLowerCase().replace(' ', '-');
    
    let actionButtons = '';
    if (res.status === 'Confirmed') {
      actionButtons = `
        <button class="btn-action check-in" onclick="updateReservationStatus('${res.ref}', 'Checked In')">
          <i data-lucide="check"></i> Check In
        </button>
        <button class="btn-action cancel" onclick="updateReservationStatus('${res.ref}', 'Cancelled')">
          <i data-lucide="trash-2"></i> Cancel
        </button>
      `;
    } else if (res.status === 'Checked In') {
      actionButtons = `
        <button class="btn-action cancel" onclick="updateReservationStatus('${res.ref}', 'Cancelled')">
          <i data-lucide="trash-2"></i> Cancel
        </button>
      `;
    } else if (res.status === 'Cancelled') {
      actionButtons = `
        <button class="btn-action reactivate" onclick="updateReservationStatus('${res.ref}', 'Confirmed')">
          <i data-lucide="rotate-ccw"></i> Reactivate
        </button>
      `;
    }

    const dateFormatted = new Date(res.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    tr.innerHTML = `
      <td><span class="ref-badge" style="cursor:pointer;" onclick="openLookupModalWithRef('${res.ref}')">${res.ref}</span></td>
      <td>
        <span class="guest-name">${res.name}</span>
        <span class="guest-meta">Created: ${new Date(res.createdAt).toLocaleDateString()}</span>
      </td>
      <td>
        <span class="guest-name" style="font-weight:normal;">${res.phone}</span>
        <span class="guest-meta">${res.email}</span>
      </td>
      <td>
        <strong>${dateFormatted}</strong>
        <div style="font-size:0.75rem; color:var(--accent-gold);">${res.time}</div>
      </td>
      <td><strong>${res.guests}</strong></td>
      <td>
        <strong>${res.tableName}</strong>
        <div class="guest-meta">${res.tableType}</div>
      </td>
      <td>
        ${occasionHtml}
        ${wishesHtml}
      </td>
      <td><div style="display:flex; flex-wrap:wrap; gap:2px;">${dishesHtml}</div></td>
      <td>
        <span class="status-indicator ${statusClass}">
          <span class="status-dot"></span>${res.status}
        </span>
      </td>
      <td>
        <div class="row-actions">${actionButtons}</div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  
  lucide.createIcons();
}

function renderEventsList(filtered) {
  const tbody = document.getElementById('tbody-events');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    document.getElementById('empty-events').style.display = 'flex';
    return;
  }
  document.getElementById('empty-events').style.display = 'none';

  filtered.forEach(rsvp => {
    const tr = document.createElement('tr');
    const statusClass = rsvp.status.toLowerCase().replace(' ', '-');

    let actionButtons = '';
    if (rsvp.status === 'Confirmed') {
      actionButtons = `
        <button class="btn-action check-in" onclick="updateEventStatus('${rsvp.ref}', 'Checked In')">
          <i data-lucide="check"></i> Check In
        </button>
        <button class="btn-action cancel" onclick="updateEventStatus('${rsvp.ref}', 'Cancelled')">
          <i data-lucide="trash-2"></i> Cancel
        </button>
      `;
    } else if (rsvp.status === 'Checked In') {
      actionButtons = `
        <button class="btn-action cancel" onclick="updateEventStatus('${rsvp.ref}', 'Cancelled')">
          <i data-lucide="trash-2"></i> Cancel
        </button>
      `;
    } else if (rsvp.status === 'Cancelled') {
      actionButtons = `
        <button class="btn-action reactivate" onclick="updateEventStatus('${rsvp.ref}', 'Confirmed')">
          <i data-lucide="rotate-ccw"></i> Reactivate
        </button>
      `;
    }

    tr.innerHTML = `
      <td><span class="ref-badge" style="cursor:pointer; background:#e5d3c3;" onclick="openLookupModalWithRef('${rsvp.ref}')">${rsvp.ref}</span></td>
      <td>
        <span class="guest-name">${rsvp.name}</span>
        <span class="guest-meta">Created: ${new Date(rsvp.createdAt).toLocaleDateString()}</span>
      </td>
      <td>
        <span class="guest-name" style="font-weight:normal;">${rsvp.phone}</span>
        <span class="guest-meta">${rsvp.email}</span>
      </td>
      <td><strong style="color:var(--accent-navy);">${rsvp.eventTitle}</strong></td>
      <td><strong>${rsvp.eventDate}</strong><div style="font-size:0.75rem; color:var(--text-muted);">${rsvp.eventTime}</div></td>
      <td><strong>${rsvp.guests} Guests</strong></td>
      <td><strong>$${rsvp.price * rsvp.guests}</strong><div class="guest-meta">$${rsvp.price}/pp</div></td>
      <td><div class="guest-meta" style="max-width:200px; font-style:italic;">${rsvp.requirements || 'No special requirements'}</div></td>
      <td>
        <span class="status-indicator ${statusClass}">
          <span class="status-dot"></span>${rsvp.status}
        </span>
      </td>
      <td>
        <div class="row-actions">${actionButtons}</div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  lucide.createIcons();
}

window.updateReservationStatus = async function(ref, newStatus) {
  const index = reservations.findIndex(r => r.ref === ref);
  if (index !== -1) {
    const oldStatus = reservations[index].status;
    reservations[index].status = newStatus;
    // Update local UI state
    localStorage.setItem('zayeka_reservations', JSON.stringify(reservations));
    renderStats();
    applyFilters();

    try {
      const res = await fetch(`${API_RESERVATIONS}/${ref}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        throw new Error('Failed to update status on server');
      }
    } catch (e) {
      console.error('Failed to sync status update with server:', e);
      // Revert local state on error
      reservations[index].status = oldStatus;
      localStorage.setItem('zayeka_reservations', JSON.stringify(reservations));
      renderStats();
      applyFilters();
      alert('Error: Could not update status on the server.');
    }
  }
};

window.updateEventStatus = async function(ref, newStatus) {
  const index = eventRsvps.findIndex(e => e.ref === ref);
  if (index !== -1) {
    const oldStatus = eventRsvps[index].status;
    eventRsvps[index].status = newStatus;
    // Update local UI state
    localStorage.setItem('zayeka_event_rsvps', JSON.stringify(eventRsvps));
    renderStats();
    applyFilters();

    try {
      const res = await fetch(`${API_EVENTS}/${ref}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        throw new Error('Failed to update status on server');
      }
    } catch (e) {
      console.error('Failed to sync status update with server:', e);
      // Revert local state on error
      eventRsvps[index].status = oldStatus;
      localStorage.setItem('zayeka_event_rsvps', JSON.stringify(eventRsvps));
      renderStats();
      applyFilters();
      alert('Error: Could not update status on the server.');
    }
  }
};

function applyFilters() {
  const searchLower = searchQuery.trim().toLowerCase();

  if (currentTab === 'tables') {
    let filtered = reservations.filter(r => {
      const matchSearch = r.name.toLowerCase().includes(searchLower) ||
                          r.ref.toLowerCase().includes(searchLower) ||
                          r.phone.includes(searchLower) ||
                          (r.tableName && r.tableName.toLowerCase().includes(searchLower));
      const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });

    filtered.sort((a, b) => {
      if (sortOption === 'date-asc') {
        return new Date(`${a.date} ${a.time.split(' ')[0]}`) - new Date(`${b.date} ${b.time.split(' ')[0]}`);
      } else if (sortOption === 'date-desc') {
        return new Date(`${b.date} ${b.time.split(' ')[0]}`) - new Date(`${a.date} ${a.time.split(' ')[0]}`);
      } else if (sortOption === 'guests-desc') {
        return b.guests - a.guests;
      } else if (sortOption === 'guests-asc') {
        return a.guests - b.guests;
      }
      return 0;
    });

    renderTablesList(filtered);
  } else {
    let filtered = eventRsvps.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(searchLower) ||
                          e.ref.toLowerCase().includes(searchLower) ||
                          e.phone.includes(searchLower) ||
                          e.eventTitle.toLowerCase().includes(searchLower);
      const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
      return matchSearch && matchStatus;
    });

    filtered.sort((a, b) => {
      if (sortOption === 'date-asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === 'date-desc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOption === 'guests-desc') {
        return b.guests - a.guests;
      } else if (sortOption === 'guests-asc') {
        return a.guests - b.guests;
      }
      return 0;
    });

    renderEventsList(filtered);
  }
}

// Walk-in modal handlers
const modalWalkin = document.getElementById('modal-walkin');
const btnNewWalkin = document.getElementById('btn-new-walkin');
const btnCloseWalkin = document.getElementById('close-modal-walkin');
const btnCancelWalkin = document.getElementById('btn-cancel-walkin');
const formWalkin = document.getElementById('form-walkin');
const walkinTableSelect = document.getElementById('walkin-table');
const walkinGuestsSelect = document.getElementById('walkin-guests');

btnNewWalkin.addEventListener('click', () => {
  document.getElementById('walkin-date').value = new Date().toISOString().split('T')[0];
  updateAvailableTables();
  modalWalkin.classList.add('open');
});
const closeWalkinModal = () => modalWalkin.classList.remove('open');
btnCloseWalkin.addEventListener('click', closeWalkinModal);
btnCancelWalkin.addEventListener('click', closeWalkinModal);

function updateAvailableTables() {
  const guestsCount = parseInt(walkinGuestsSelect.value);
  walkinTableSelect.innerHTML = '';
  
  const validTables = TABLES.filter(t => t.capacity >= guestsCount);
  validTables.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = `${t.name} (${t.type}) - Cap: ${t.capacity}`;
    walkinTableSelect.appendChild(opt);
  });

  if (validTables.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'No tables fit this capacity';
    walkinTableSelect.appendChild(opt);
  }
}

walkinGuestsSelect.addEventListener('change', updateAvailableTables);

formWalkin.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('walkin-name').value.trim();
  const phone = document.getElementById('walkin-phone').value.trim();
  const email = document.getElementById('walkin-email').value.trim();
  const date = document.getElementById('walkin-date').value;
  const time = document.getElementById('walkin-time').value;
  const guests = parseInt(walkinGuestsSelect.value);
  const tableId = walkinTableSelect.value;
  const occasion = document.getElementById('walkin-occasion').value;
  const specialRequests = document.getElementById('walkin-requests').value.trim();

  if (!tableId) {
    alert('Please select a valid table.');
    return;
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'ZYK-W';
  for (let i = 0; i < 5; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const tableObj = TABLES.find(t => t.id === tableId);

  const newRes = {
    ref,
    date,
    time,
    guests,
    tableId,
    tableName: tableObj.name,
    tableType: tableObj.type,
    name,
    email,
    phone,
    occasion,
    specialRequests,
    dishes: {},
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  reservations.push(newRes);
  await syncReservations(reservations);
  renderStats();
  applyFilters();
  
  formWalkin.reset();
  closeWalkinModal();
});

// Ticket Scan/Lookup Modal
const modalScan = document.getElementById('modal-scan');
const btnScanSim = document.getElementById('btn-scan-sim');
const btnCloseScan = document.getElementById('close-modal-scan');
const btnDoLookup = document.getElementById('btn-do-lookup');
const inputLookupCode = document.getElementById('input-lookup-code');
const lookupError = document.getElementById('lookup-error');
const lookupResultCard = document.getElementById('lookup-result-card');

btnScanSim.addEventListener('click', () => {
  inputLookupCode.value = '';
  lookupError.style.display = 'none';
  lookupResultCard.style.display = 'none';
  modalScan.classList.add('open');
});
btnCloseScan.addEventListener('click', () => modalScan.classList.remove('open'));

btnDoLookup.addEventListener('click', async () => {
  let val = inputLookupCode.value.trim();
  lookupError.style.display = 'none';
  lookupResultCard.style.display = 'none';

  if (!val) return;

  let lookupRef = val.toUpperCase();
  let queryParams = null;

  if (val.includes('?') || val.includes('&')) {
    try {
      const search = val.substring(val.indexOf('?'));
      queryParams = new URLSearchParams(search);
      const refParam = queryParams.get('ref');
      if (refParam) {
        lookupRef = refParam.toUpperCase();
      }
    } catch (err) {
      console.error('Failed to parse URL query params', err);
    }
  }

  let foundRes = reservations.find(r => r.ref.toUpperCase() === lookupRef);
  let foundEvent = eventRsvps.find(e => e.ref.toUpperCase() === lookupRef);

  if (foundRes) {
    displayTicketResult(foundRes, 'table', queryParams);
  } else if (foundEvent) {
    displayTicketResult(foundEvent, 'event', queryParams);
  } else {
    if (queryParams && queryParams.get('receipt')) {
      const type = queryParams.get('receipt');
      if (type === 'reservation') {
        let parsedDishes = {};
        try {
          const dishesParam = queryParams.get('dishes');
          if (dishesParam) {
            parsedDishes = JSON.parse(decodeURIComponent(dishesParam));
          }
        } catch (e) {}

        const importedRes = {
          ref: queryParams.get('ref') || lookupRef,
          date: queryParams.get('date') || getRelativeDate(0),
          time: queryParams.get('time') || '7:00 PM',
          guests: parseInt(queryParams.get('guests') || '2'),
          tableId: 'T-IMP',
          tableName: queryParams.get('table') || 'Assigned Table',
          tableType: queryParams.get('tableType') || 'Standard',
          name: queryParams.get('name') || 'QR Guest',
          email: queryParams.get('email') || '',
          phone: queryParams.get('phone') || '',
          occasion: queryParams.get('occasion') || '',
          specialRequests: queryParams.get('requests') || '',
          dishes: parsedDishes,
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        };

        reservations.push(importedRes);
        await syncReservations(reservations);
        renderStats();
        applyFilters();

        displayTicketResult(importedRes, 'table', null);
      } else {
        lookupError.textContent = `Reference code "${lookupRef}" not found.`;
        lookupError.style.display = 'block';
      }
    } else {
      lookupError.textContent = `Reference code "${lookupRef}" not found.`;
      lookupError.style.display = 'block';
    }
  }
});

function displayTicketResult(record, type, queryParams) {
  lookupResultCard.innerHTML = '';
  lookupResultCard.style.display = 'block';

  let ticketHtml = '';
  
  if (type === 'table') {
    let dishesList = '';
    if (record.dishes && Object.keys(record.dishes).length > 0) {
      dishesList = Object.entries(record.dishes)
        .map(([id, qty]) => `<li>${getDishName(id)} <span style="float:right;">x${qty}</span></li>`)
        .join('');
      dishesList = `<div class="ticket-preview-divider"></div>
                    <span class="ticket-preview-label">Selected Tastings (Orders)</span>
                    <ul style="font-size:0.75rem; padding-left:1.25rem; margin-top:0.25rem;">${dishesList}</ul>`;
    }

    const occasionText = record.occasion 
      ? `<div class="ticket-preview-row"><span class="ticket-preview-label">Occasion</span><span class="ticket-preview-value" style="color:var(--accent-navy);">${record.occasion}</span></div>`
      : '';

    // Clean up specialRequests by removing the redundant "Selected Dishes: ..." list
    let cleanWishes = record.specialRequests || '';
    if (cleanWishes.includes('Selected Dishes:')) {
      cleanWishes = cleanWishes
        .replace(/Selected Dishes:\s*[^|]*/g, '')
        .replace(/^\|\s*Notes:\s*/, '')
        .trim();
    }

    const actionBtn = record.status === 'Confirmed' 
      ? `<button class="btn-desk-primary" style="width:100%; justify-content:center; margin-top:0.5rem;" onclick="checkInFromLookup('${record.ref}', 'table')"><i data-lucide="check-circle-2"></i> Confirm Guest Arrival</button>`
      : `<div class="status-indicator ${record.status.toLowerCase().replace(' ', '-')}" style="width:100%; justify-content:center; text-align:center;"><span class="status-dot"></span>${record.status}</div>`;

    ticketHtml = `
      <div class="ticket-preview-header">
        <strong style="color:var(--accent-navy); font-size:1.1rem;">ZAYEKA RECEIPT</strong>
        <span class="ticket-preview-type">TABLE RESERVATION</span>
      </div>
      <div class="ticket-preview-body">
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Reference</span>
          <span class="ticket-preview-value" style="font-size:1rem; color:var(--text-primary);">${record.ref}</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Guest Name</span>
          <span class="ticket-preview-value">${record.name}</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Contact</span>
          <span class="ticket-preview-value">${record.phone} / ${record.email}</span>
        </div>
        <div class="ticket-preview-divider"></div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Date & Time</span>
          <span class="ticket-preview-value">${new Date(record.date).toLocaleDateString()} at ${record.time}</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Guests Count</span>
          <span class="ticket-preview-value">${record.guests} guests</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Assigned Table</span>
          <span class="ticket-preview-value">${record.tableName} (${record.tableType})</span>
        </div>
        ${occasionText}
        ${cleanWishes ? `<div class="ticket-preview-divider"></div><span class="ticket-preview-label">Wishes</span><div style="font-size:0.75rem; font-style:italic;">"${cleanWishes}"</div>` : ''}
        ${dishesList}
        <div class="ticket-preview-divider"></div>
        ${actionBtn}
      </div>
    `;
  } else {
    const actionBtn = record.status === 'Confirmed' 
      ? `<button class="btn-desk-primary" style="width:100%; justify-content:center; margin-top:0.5rem;" onclick="checkInFromLookup('${record.ref}', 'event')"><i data-lucide="check-circle-2"></i> Confirm Event Admission</button>`
      : `<div class="status-indicator ${record.status.toLowerCase().replace(' ', '-')}" style="width:100%; justify-content:center; text-align:center;"><span class="status-dot"></span>${record.status}</div>`;

    ticketHtml = `
      <div class="ticket-preview-header">
        <strong style="color:var(--accent-gold); font-size:1.1rem;">VIP EVENT PASS</strong>
        <span class="ticket-preview-type" style="background:var(--bg-tertiary);">EVENT INVITE</span>
      </div>
      <div class="ticket-preview-body">
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Pass Reference</span>
          <span class="ticket-preview-value" style="font-size:1rem; color:var(--text-primary);">${record.ref}</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Guest Name</span>
          <span class="ticket-preview-value">${record.name}</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Contact</span>
          <span class="ticket-preview-value">${record.phone}</span>
        </div>
        <div class="ticket-preview-divider"></div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Event Title</span>
          <span class="ticket-preview-value" style="color:var(--accent-navy);">${record.eventTitle}</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Schedule</span>
          <span class="ticket-preview-value">${record.eventDate} at ${record.eventTime}</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Guests Registered</span>
          <span class="ticket-preview-value">${record.guests} Persons</span>
        </div>
        <div class="ticket-preview-row">
          <span class="ticket-preview-label">Pricing Total</span>
          <span class="ticket-preview-value">$${record.price * record.guests} ($${record.price}/pp)</span>
        </div>
        ${record.requirements ? `<div class="ticket-preview-divider"></div><span class="ticket-preview-label">Special Notes</span><div style="font-size:0.75rem; font-style:italic;">"${record.requirements}"</div>` : ''}
        <div class="ticket-preview-divider"></div>
        ${actionBtn}
      </div>
    `;
  }

  lookupResultCard.innerHTML = ticketHtml;
  lucide.createIcons();
}

window.checkInFromLookup = async function(ref, type) {
  if (type === 'table') {
    await updateReservationStatus(ref, 'Checked In');
    const record = reservations.find(r => r.ref === ref);
    if (record) displayTicketResult(record, 'table', null);
  } else {
    await updateEventStatus(ref, 'Checked In');
    const record = eventRsvps.find(e => e.ref === ref);
    if (record) displayTicketResult(record, 'event', null);
  }
};

window.openLookupModalWithRef = function(ref) {
  inputLookupCode.value = ref;
  btnDoLookup.click();
  modalScan.classList.add('open');
};

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    
    btn.classList.add('active');
    const tabName = btn.getAttribute('data-tab');
    document.getElementById(`panel-${tabName}`).classList.add('active');
    
    currentTab = tabName;
    applyFilters();
  });
});

document.getElementById('input-search').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  applyFilters();
});

document.getElementById('select-status').addEventListener('change', (e) => {
  statusFilter = e.target.value;
  applyFilters();
});

document.getElementById('select-sort').addEventListener('change', (e) => {
  sortOption = e.target.value;
  applyFilters();
});

// Initialization
window.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  renderStats();
  applyFilters();
  lucide.createIcons();

  // Background polling every 10 seconds for real-time customer check-ins
  setInterval(async () => {
    await loadData();
    renderStats();
    applyFilters();
  }, 10000);
});
