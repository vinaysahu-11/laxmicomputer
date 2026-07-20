const express = require('express');
const {
  getAllSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory
} = require('../controllers/successStoryController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public route to fetch stories
router.get('/', getAllSuccessStories);

// Admin-only protected routes
router.post('/', protect, authorizeRoles('admin'), createSuccessStory);
router.put('/:id', protect, authorizeRoles('admin'), updateSuccessStory);
router.delete('/:id', protect, authorizeRoles('admin'), deleteSuccessStory);

module.exports = router;
