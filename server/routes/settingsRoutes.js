const express = require('express');
const { 
  getSettings, 
  updateSettings, 
  factoryResetSettings 
} = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Publicly readable (e.g. for address, contact phone on public website)
router.get('/', getSettings);

// Admin-only updates and resets
router.put('/', protect, authorizeRoles('admin'), updateSettings);
router.post('/reset', protect, authorizeRoles('admin'), factoryResetSettings);

module.exports = router;
