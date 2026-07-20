const Payment = require('../models/Payment');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private (Admin Only)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payment transactions', error: error.message });
  }
};

// @desc    Create new invoice / payment entry
// @route   POST /api/payments
// @access  Private (Admin Only)
exports.createPayment = async (req, res) => {
  try {
    const { studentName, course, amount, status, date, dueDate } = req.body;
    if (!studentName || !course || amount === undefined) {
      return res.status(400).json({ message: 'Required fields: studentName, course, amount' });
    }

    // Generate a unique invoice number
    const rand = Math.floor(1000 + Math.random() * 9000);
    const invoiceId = `INV-${rand}`;

    const payment = await Payment.create({
      invoiceId,
      studentName,
      course,
      amount: Number(amount),
      status: status || 'Pending',
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dueDate: dueDate || ''
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment entry', error: error.message });
  }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id
// @access  Private (Admin Only)
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    if (req.body.studentName) payment.studentName = req.body.studentName;
    if (req.body.course) payment.course = req.body.course;
    if (req.body.amount !== undefined) payment.amount = Number(req.body.amount);
    if (req.body.status) payment.status = req.body.status;
    if (req.body.date) payment.date = req.body.date;
    if (req.body.dueDate) payment.dueDate = req.body.dueDate;

    const updatedPayment = await payment.save();
    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment entry', error: error.message });
  }
};

// @desc    Delete payment entry
// @route   DELETE /api/payments/:id
// @access  Private (Admin Only)
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }
    await Payment.deleteOne({ _id: req.params.id });
    res.json({ message: 'Payment record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment entry', error: error.message });
  }
};
