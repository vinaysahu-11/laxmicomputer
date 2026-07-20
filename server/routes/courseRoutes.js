const express = require('express');
const { 
  getAllCourses, 
  getFeaturedCourses, 
  getSingleCourse, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public Routes
router.get('/', getAllCourses);
router.get('/featured', getFeaturedCourses);
router.get('/:idOrSlug', getSingleCourse);

// Admin Protected Routes
router.post('/', protect, authorizeRoles('admin'), upload.single('thumbnail'), createCourse);
router.put('/:id', protect, authorizeRoles('admin'), upload.single('thumbnail'), updateCourse);
router.delete('/:id', protect, authorizeRoles('admin'), deleteCourse);

module.exports = router;
