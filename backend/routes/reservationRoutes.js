import express from 'express';
import Reservation from '../models/reservation.js';

const router = express.Router();

// Generate a unique booking reference ZYK-XXXXXX
const generateBookingRef = async () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let isUnique = false;
  let ref = '';

  while (!isUnique) {
    ref = 'ZYK-';
    for (let i = 0; i < 6; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Check if it already exists
    const existing = await Reservation.findOne({ ref });
    if (!existing) {
      isUnique = true;
    }
  }
  return ref;
};

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public
router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const promises = req.body.map(item => {
        const ref = item.ref || ('ZYK-' + Math.random().toString(36).substr(2, 6).toUpperCase());
        return Reservation.findOneAndUpdate(
          { ref: ref.toUpperCase() },
          { ...item, ref: ref.toUpperCase() },
          { upsert: true, new: true }
        );
      });
      const results = await Promise.all(promises);
      return res.status(201).json(results);
    }

    const {
      date,
      time,
      guests,
      tableId,
      tableName,
      tableType,
      name,
      email,
      phone,
      occasion,
      specialRequests,
      dishes
    } = req.body;

    if (!date || !time || !guests || !tableId || !name || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const ref = await generateBookingRef();

    const reservation = new Reservation({
      ref,
      date,
      time,
      guests,
      tableId,
      tableName: tableName || `Table ${tableId}`,
      tableType: tableType || 'Standard',
      name,
      email,
      phone,
      occasion: occasion || '',
      specialRequests: specialRequests || '',
      dishes: dishes || {},
      status: 'Confirmed'
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reservation', error: error.message });
  }
});

// @desc    Get reservation by reference code
// @route   GET /api/reservations/:ref
// @access  Public
router.get('/:ref', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ ref: req.params.ref.toUpperCase() });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to fetch reservation', error: error.message });
  }
});

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Public (In production this would be protected/private)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to fetch reservations', error: error.message });
  }
});

// @desc    Update reservation status
// @route   PUT /api/reservations/:ref
// @access  Public
router.put('/:ref', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    const reservation = await Reservation.findOneAndUpdate(
      { ref: req.params.ref.toUpperCase() },
      { status },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update reservation', error: error.message });
  }
});

export default router;
