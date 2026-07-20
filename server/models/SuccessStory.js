const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title/Heading is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  youtubeUrl: {
    type: String,
    required: [true, 'YouTube URL is required'],
    trim: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('SuccessStory', successStorySchema);
