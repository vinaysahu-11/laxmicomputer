const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Album name is required'],
    unique: true,
    trim: true
  },
  coverImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Album', albumSchema);
