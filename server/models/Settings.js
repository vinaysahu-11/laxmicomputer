const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  academyName: {
    type: String,
    default: 'EduAcademy Excellence'
  },
  academyEmail: {
    type: String,
    default: 'contact@eduacademy.com'
  },
  academyAddress: {
    type: String,
    default: '742 Evergreen Terrace, Tech Valley, CA 90210'
  },
  academyPhone: {
    type: String,
    default: '+1 (555) 123-4567'
  },
  academyWebsite: {
    type: String,
    default: 'www.eduacademy.com'
  },
  darkMode: {
    type: Boolean,
    default: false
  },
  autoBackups: {
    type: Boolean,
    default: true
  },
  publicAccess: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
