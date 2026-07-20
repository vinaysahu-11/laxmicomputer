const User = require('../models/User');
const Course = require('../models/Course');
const Payment = require('../models/Payment');
const Admission = require('../models/Admission');
const Notification = require('../models/Notification');

// @desc    Get aggregated stats for Admin Dashboard
// @route   GET /api/stats
// @access  Private (Admin Only)
exports.getAdminStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalCourses = await Course.countDocuments({});
    
    // Aggregate revenue from payments status: 'Paid'
    const payments = await Payment.find({ status: 'Paid' });
    const revenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

    // Aggregate pending fees from payments status: 'Pending' or 'Overdue'
    const pendingPayments = await Payment.find({ status: { $in: ['Pending', 'Overdue'] } });
    const pendingFees = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);

    // Invoice count
    const invoiceCount = await Payment.countDocuments({});

    // Recent 5 admissions
    const recentAdmissions = await Admission.find({}).sort({ createdAt: -1 }).limit(5);

    // Count of pending admissions
    const pendingAdmissions = await Admission.countDocuments({ stage: 'applied' });

    // Recent 5 notifications
    const recentNotifications = await Notification.find({ status: 'active' }).sort({ createdAt: -1 }).limit(5);

    res.json({
      totalStudents,
      totalTeachers,
      totalCourses,
      revenue,
      pendingFees,
      invoiceCount,
      pendingAdmissions,
      recentAdmissions,
      recentNotifications
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard statistics', error: error.message });
  }
};
