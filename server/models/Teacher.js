const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
