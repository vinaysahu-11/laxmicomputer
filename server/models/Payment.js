const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true
  },
  studentName: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Overdue'],
    default: 'Pending'
  },
  date: {
    type: String,
    required: false
  },
  dueDate: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
