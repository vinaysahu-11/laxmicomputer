const express = require('express');
const { 
  getAllPayments, 
  createPayment, 
  updatePayment, 
  deletePayment 
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Admin-only invoicing & tracking
router.get('/', protect, authorizeRoles('admin'), getAllPayments);
router.post('/', protect, authorizeRoles('admin'), createPayment);
router.put('/:id', protect, authorizeRoles('admin'), updatePayment);
router.delete('/:id', protect, authorizeRoles('admin'), deletePayment);

module.exports = router;
