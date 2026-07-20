const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teacherController');

router.route('/')
  .get(getTeachers)
  .post(upload.single('photo'), createTeacher);

router.route('/:id')
  .put(upload.single('photo'), updateTeacher)
  .delete(deleteTeacher);

module.exports = router;
