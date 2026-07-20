const express = require('express');
const {
  getAllAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum
} = require('../controllers/albumController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public route to fetch albums
router.get('/', getAllAlbums);

// Admin-only protected routes
router.post('/', protect, authorizeRoles('admin'), upload.single('coverImage'), createAlbum);
router.put('/:id', protect, authorizeRoles('admin'), upload.single('coverImage'), updateAlbum);
router.delete('/:id', protect, authorizeRoles('admin'), deleteAlbum);

module.exports = router;
