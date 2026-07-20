const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    trim: true
  },
  mode: {
    type: String,
    required: [true, 'Course delivery mode is required'],
    enum: ['online', 'offline', 'hybrid'],
    default: 'online'
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    default: 0
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  instructor: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Pre-save hook to generate URL friendly slug from title if not provided
courseSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
