const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Notification content is required']
  },
  category: {
    type: String,
    enum: ['all', 'teacher', 'student'],
    default: 'all'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
