const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  email: {
    type: String,
    default: '',
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  course: {
    type: String,
    required: [true, 'Course selection is required'],
    trim: true
  },
  batch: {
    type: String,
    default: 'Jan 2024 (Morning)',
    trim: true
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  message: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admission', admissionSchema);
