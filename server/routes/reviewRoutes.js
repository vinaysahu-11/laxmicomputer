const express = require('express');
const { 
  getAllReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public route
router.get('/', getAllReviews);

// Admin Protected routes
router.post('/', protect, authorizeRoles('admin'), createReview);
router.put('/:id', protect, authorizeRoles('admin'), updateReview);
router.delete('/:id', protect, authorizeRoles('admin'), deleteReview);

module.exports = router;
