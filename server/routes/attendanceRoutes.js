const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  getAttendance,
  saveAttendance,
  deleteAttendance
} = require('../controllers/attendanceController');

// All attendance routes are protected for admin/teacher
router.use(protect);
router.use(authorizeRoles('admin', 'teacher'));

router.route('/')
  .get(getAttendance)
  .post(saveAttendance);

router.route('/:id')
  .delete(deleteAttendance);

module.exports = router;
