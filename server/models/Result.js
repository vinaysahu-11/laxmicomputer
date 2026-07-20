const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  examName: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true
  },
  percentage: {
    type: Number,
    required: [true, 'Percentage is required']
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Result', resultSchema);
