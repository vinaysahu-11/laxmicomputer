const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'Album ID is required']
  },
  image: {
    type: String,
    required: [true, 'Image path is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
