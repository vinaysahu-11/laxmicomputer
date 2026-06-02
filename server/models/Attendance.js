const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
