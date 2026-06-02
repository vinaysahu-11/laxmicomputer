const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
