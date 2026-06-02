const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
