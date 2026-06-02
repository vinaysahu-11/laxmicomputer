const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
