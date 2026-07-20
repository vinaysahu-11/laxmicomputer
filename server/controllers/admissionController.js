const Admission = require('../models/Admission');
const Student = require('../models/Student');

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Private (Admin Only)
exports.getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find({}).sort({ createdAt: -1 });
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving admissions list', error: error.message });
  }
};

// @desc    Create new admission (Public inquiry or admin generated)
// @route   POST /api/admissions
// @access  Public
exports.createAdmission = async (req, res) => {
  try {
    const { studentName, email, phone, course, batch, address, message, status } = req.body;
    if (!studentName || !phone || !course) {
      return res.status(400).json({ message: 'Required fields: studentName, phone, course' });
    }

    const admission = await Admission.create({
      studentName,
      email: email || '',
      phone,
      course,
      batch: batch || 'Jan 2024 (Morning)',
      address: address || '',
      message: message || '',
      status: status || 'pending'
    });

    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admission inquiry', error: error.message });
  }
};

// @desc    Update admission details/status
// @route   PUT /api/admissions/:id
// @access  Private (Admin Only)
exports.updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: 'Admission record not found' });
    }

    const oldStatus = admission.status;
    const { studentName, email, phone, course, batch, address, message, status } = req.body;

    if (studentName) admission.studentName = studentName;
    if (email !== undefined) admission.email = email;
    if (phone) admission.phone = phone;
    if (course) admission.course = course;
    if (batch) admission.batch = batch;
    if (address !== undefined) admission.address = address;
    if (message !== undefined) admission.message = message;
    if (status) admission.status = status;

    const updatedAdmission = await admission.save();

    // Cascading student creation if approved
    if (status === 'approved' && oldStatus !== 'approved') {
      // Check if student with same email or phone already exists
      const query = [];
      if (updatedAdmission.email) {
        query.push({ email: updatedAdmission.email.toLowerCase().trim() });
      }
      query.push({ phone: updatedAdmission.phone.trim() });

      const existingStudent = await Student.findOne({ $or: query });

      if (!existingStudent) {
        await Student.create({
          name: updatedAdmission.studentName,
          email: updatedAdmission.email || `${updatedAdmission.studentName.toLowerCase().replace(/\s+/g, '')}@example.com`,
          phone: updatedAdmission.phone,
          course: updatedAdmission.course,
          batch: updatedAdmission.batch,
          address: updatedAdmission.address || 'Address provided via admission',
          joiningDate: new Date(),
          status: true
        });
      }
    }

    res.json(updatedAdmission);
  } catch (error) {
    res.status(500).json({ message: 'Error updating admission record', error: error.message });
  }
};

// @desc    Delete admission record
// @route   DELETE /api/admissions/:id
// @access  Private (Admin Only)
exports.deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: 'Admission record not found' });
    }
    await Admission.deleteOne({ _id: req.params.id });
    res.json({ message: 'Admission record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admission record', error: error.message });
  }
};
