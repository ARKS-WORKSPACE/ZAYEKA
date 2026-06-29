import express from 'express';
import EventRSVP from '../models/eventRSVP.js';

const router = express.Router();

// Generate a unique VIP Event Pass reference ZYK-EV-XXXXXX
const generateEventPassRef = async () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let isUnique = false;
  let ref = '';

  while (!isUnique) {
    ref = 'ZYK-EV-';
    for (let i = 0; i < 6; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Check if it already exists
    const existing = await EventRSVP.findOne({ ref });
    if (!existing) {
      isUnique = true;
    }
  }
  return ref;
};

// @desc    Create a new event RSVP
// @route   POST /api/events/rsvp
// @access  Public
router.post('/rsvp', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const promises = req.body.map(item => {
        const ref = item.ref || ('ZYK-EV-' + Math.random().toString(36).substr(2, 6).toUpperCase());
        return EventRSVP.findOneAndUpdate(
          { ref: ref.toUpperCase() },
          { ...item, ref: ref.toUpperCase() },
          { upsert: true, new: true }
        );
      });
      const results = await Promise.all(promises);
      return res.status(201).json(results);
    }

    const {
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      price,
      name,
      email,
      phone,
      guests,
      requirements
    } = req.body;

    if (!eventId || !eventTitle || !eventDate || !eventTime || !name || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const ref = await generateEventPassRef();

    const eventRsvp = new EventRSVP({
      ref,
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      price: price || 0,
      name,
      email,
      phone,
      guests: guests || 1,
      requirements: requirements || '',
      status: 'Confirmed'
    });

    const savedRsvp = await eventRsvp.save();
    res.status(201).json(savedRsvp);
  } catch (error) {
    res.status(500).json({ message: 'Failed to register for event', error: error.message });
  }
});

// @desc    Get event RSVP by reference code
// @route   GET /api/events/rsvp/:ref
// @access  Public
router.get('/rsvp/:ref', async (req, res) => {
  try {
    const rsvp = await EventRSVP.findOne({ ref: req.params.ref.toUpperCase() });
    if (!rsvp) {
      return res.status(404).json({ message: 'Event VIP Pass not found.' });
    }
    res.json(rsvp);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to fetch event pass', error: error.message });
  }
});

// @desc    Get all event RSVPs
// @route   GET /api/events/rsvp
// @access  Public (In production this would be protected/private)
router.get('/rsvp', async (req, res) => {
  try {
    const rsvps = await EventRSVP.find({}).sort({ createdAt: -1 });
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to fetch RSVPs', error: error.message });
  }
});

// @desc    Update event RSVP status
// @route   PUT /api/events/rsvp/:ref
// @access  Public
router.put('/rsvp/:ref', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    const rsvp = await EventRSVP.findOneAndUpdate(
      { ref: req.params.ref.toUpperCase() },
      { status },
      { new: true }
    );
    if (!rsvp) {
      return res.status(404).json({ message: 'Event VIP Pass not found.' });
    }
    res.json(rsvp);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event pass', error: error.message });
  }
});

export default router;
