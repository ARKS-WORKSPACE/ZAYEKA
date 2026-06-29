import express from 'express';
import MenuItem from '../models/menuItem.js';

const router = express.Router();

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({}).sort({ id: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Failed to fetch menu items', error: error.message });
  }
});

export default router;
