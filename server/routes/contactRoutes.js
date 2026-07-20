const express = require('express');
const { 
  getAllContacts, 
  createContact, 
  updateContact, 
  deleteContact 
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public contact submission
router.post('/', createContact);

// Admin-only contact inbox management
router.get('/', protect, authorizeRoles('admin'), getAllContacts);
router.put('/:id', protect, authorizeRoles('admin'), updateContact);
router.delete('/:id', protect, authorizeRoles('admin'), deleteContact);

module.exports = router;
