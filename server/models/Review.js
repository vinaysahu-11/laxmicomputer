const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  reviewText: {
    type: String,
    required: [true, 'Review text is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  studentPhoto: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Approved', 'Pending', 'Flagged', 'Archived'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
