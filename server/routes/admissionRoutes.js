const express = require('express');
const { 
  getAllAdmissions, 
  createAdmission, 
  updateAdmission, 
  deleteAdmission 
} = require('../controllers/admissionController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public submission
router.post('/', createAdmission);

// Admin-only management
router.get('/', protect, authorizeRoles('admin'), getAllAdmissions);
router.put('/:id', protect, authorizeRoles('admin'), updateAdmission);
router.delete('/:id', protect, authorizeRoles('admin'), deleteAdmission);

module.exports = router;
