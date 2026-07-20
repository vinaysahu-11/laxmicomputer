const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// @desc    Get attendance sheet for a course, batch, and date
// @route   GET /api/attendance
// @access  Private (Admin/Teacher Only)
exports.getAttendance = async (req, res) => {
  try {
    const { course, batch, date } = req.query;

    if (!course || !batch || !date) {
      return res.status(400).json({ message: 'Required query params: course, batch, date' });
    }

    const targetDate = new Date(date);
    // Set hours to midnight to compare date-only parts consistently
    targetDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(targetDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);

    // 1. Fetch all students registered in this course and batch
    const studentsQuery = {};
    if (course !== 'All Courses') studentsQuery.course = course;
    if (batch !== 'All Batches') studentsQuery.batch = batch;
    
    // Only fetch active students
    studentsQuery.status = true;

    const students = await Student.find(studentsQuery).sort({ name: 1 });

    // 2. Fetch existing attendance records for this date range
    const attendanceRecords = await Attendance.find({
      course: course !== 'All Courses' ? course : { $exists: true },
      batch: batch !== 'All Batches' ? batch : { $exists: true },
      date: {
        $gte: targetDate,
        $lt: endDate
      }
    });

    // Create a lookup map of studentId -> status
    const attendanceMap = {};
    attendanceRecords.forEach(rec => {
      attendanceMap[rec.studentId.toString()] = rec.status;
    });

    // 3. Map students to sheet items
    const sheet = students.map(student => ({
      studentId: student._id,
      name: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      phone: student.phone,
      photo: student.photo,
      status: attendanceMap[student._id.toString()] || 'Present' // default to Present if no record exists
    }));

    res.json(sheet);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attendance sheet', error: error.message });
  }
};

// @desc    Save/Update bulk attendance sheet
// @route   POST /api/attendance
// @access  Private (Admin/Teacher Only)
exports.saveAttendance = async (req, res) => {
  try {
    const { course, batch, date, records } = req.body;

    if (!course || !batch || !date || !records || !Array.isArray(records)) {
      return res.status(400).json({ message: 'Required fields: course, batch, date, records[]' });
    }

    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0);

    // Upsert each record
    const promises = records.map(rec => {
      return Attendance.findOneAndUpdate(
        { 
          studentId: rec.studentId, 
          date: targetDate 
        },
        { 
          status: rec.status, 
          course, 
          batch 
        },
        { 
          upsert: true, 
          new: true,
          setDefaultsOnInsert: true 
        }
      );
    });

    await Promise.all(promises);

    res.json({ message: 'Attendance records saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving attendance registry', error: error.message });
  }
};

// @desc    Delete attendance record (Placeholder for CRUD mapping)
// @route   DELETE /api/attendance/:id
// @access  Private (Admin Only)
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    await Attendance.deleteOne({ _id: req.params.id });
    res.json({ message: 'Attendance record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendance record', error: error.message });
  }
};
