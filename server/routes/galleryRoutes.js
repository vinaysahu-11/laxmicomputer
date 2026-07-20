const express = require('express');
const {
  getAllGalleryImages,
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getStorageUsage
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public route
router.get('/', getAllGalleryImages);

// Admin Protected routes
router.get('/storage', protect, authorizeRoles('admin'), getStorageUsage);
router.post('/upload', protect, authorizeRoles('admin'), upload.single('image'), uploadGalleryImage);
router.put('/:id', protect, authorizeRoles('admin'), upload.single('image'), updateGalleryImage);
router.delete('/:id', protect, authorizeRoles('admin'), deleteGalleryImage);

module.exports = router;
