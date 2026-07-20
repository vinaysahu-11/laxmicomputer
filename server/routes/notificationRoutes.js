const express = require('express');
const { 
  getAllNotifications, 
  createNotification, 
  updateNotification, 
  deleteNotification 
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public route
router.get('/', getAllNotifications);

// Admin Protected routes
router.post('/', protect, authorizeRoles('admin'), createNotification);
router.put('/:id', protect, authorizeRoles('admin'), updateNotification);
router.delete('/:id', protect, authorizeRoles('admin'), deleteNotification);

module.exports = router;
