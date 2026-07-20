const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');
const Attendance = require('../models/Attendance');

// @desc    Get aggregated real-time counts for Admin Dashboard
// @route   GET /api/dashboard/stats
// @access  Private (Admin Only)
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalAdmissions,
      totalCourses,
      pendingAdmissions,
      recentAdmissions,
      recentNotifications,
      invoiceCount
    ] = await Promise.all([
      Student.countDocuments({}),
      Teacher.countDocuments({}),
      Admission.countDocuments({}),
      Course.countDocuments({}),
      Admission.countDocuments({ status: 'pending' }),
      Admission.find({}).sort({ createdAt: -1 }).limit(5),
      Notification.find({ status: 'active' }).sort({ createdAt: -1 }).limit(5),
      Payment.countDocuments({})
    ]);

    // Aggregate dynamic revenue from payments
    const payments = await Payment.find({ status: 'Paid' });
    const revenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

    // Aggregate pending fees
    const pendingPayments = await Payment.find({ status: { $in: ['Pending', 'Overdue'] } });
    const pendingFees = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);

    // Compute live attendance rate percentage dynamically
    const totalAttendance = await Attendance.countDocuments({});
    const presentAttendance = await Attendance.countDocuments({ status: 'Present' });
    const attendancePercentage = totalAttendance > 0 
      ? parseFloat(((presentAttendance / totalAttendance) * 100).toFixed(1))
      : 100.0;

    res.json({
      totalStudents,
      totalTeachers,
      totalAdmissions,
      totalCourses,
      revenue,
      pendingFees,
      invoiceCount,
      pendingAdmissions,
      recentAdmissions,
      recentNotifications,
      attendancePercentage
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard stats', error: error.message });
  }
};
