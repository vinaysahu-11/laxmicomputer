const express = require('express');
const { 
  getAllResults, 
  createResult, 
  updateResult, 
  deleteResult 
} = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public route
router.get('/', getAllResults);

// Admin Protected routes
router.post('/', protect, authorizeRoles('admin'), createResult);
router.put('/:id', protect, authorizeRoles('admin'), updateResult);
router.delete('/:id', protect, authorizeRoles('admin'), deleteResult);

module.exports = router;
