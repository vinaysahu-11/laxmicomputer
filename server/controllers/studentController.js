const Student = require('../models/Student');
const fs = require('fs');
const path = require('path');

// Helper to delete photo from disk
const deletePhotoFile = (photoPath) => {
  if (!photoPath || !photoPath.startsWith('/uploads/')) return;
  const cleanPath = photoPath.startsWith('/') ? photoPath.substring(1) : photoPath;
  const absolutePath = path.join(__dirname, '..', cleanPath);
  if (fs.existsSync(absolutePath)) {
    try {
      fs.unlinkSync(absolutePath);
    } catch (err) {
      console.error('Failed to delete student photo file:', err);
    }
  }
};

// Helper to auto-generate Student ID STU-2026-001, etc.
const generateStudentId = async () => {
  const lastStudent = await Student.findOne({ studentId: /^STU-2026-/ }).sort({ studentId: -1 });
  let newNum = 1;
  if (lastStudent && lastStudent.studentId) {
    const parts = lastStudent.studentId.split('-');
    const lastNum = parseInt(parts[2], 10);
    if (!isNaN(lastNum)) {
      newNum = lastNum + 1;
    }
  }
  return `STU-2026-${String(newNum).padStart(3, '0')}`;
};

// @desc    Get all students (with search, filter, and pagination)
// @route   GET /api/students
// @access  Public
exports.getStudents = async (req, res) => {
  try {
    const { search, course, batch, status, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    // Dropdown filters
    if (course && course !== 'All Courses') {
      query.course = course;
    }
    if (batch && batch !== 'All Batches') {
      query.batch = batch;
    }
    if (status !== undefined) {
      query.status = status === 'true' || status === true;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      students,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

// @desc    Create a student
// @route   POST /api/students
// @access  Private (Admin Only)
exports.createStudent = async (req, res) => {
  try {
    const { name, course, batch, email, phone, address, joiningDate, status, password } = req.body;

    if (!name || !course || !batch || !email || !phone || !address || !joiningDate) {
      return res.status(400).json({ message: 'Required fields: name, course, batch, email, phone, address, joiningDate' });
    }

    // Validate duplicate email
    const emailExists = await Student.findOne({ email: email.toLowerCase().trim() });
    if (emailExists) {
      return res.status(400).json({ message: 'A student with this Email already exists' });
    }

    // Auto-generate Student ID
    const studentId = await generateStudentId();

    let photo = '';
    // Handle image file upload OR raw image path
    if (req.file) {
      photo = `/uploads/students/${req.file.filename}`;
    } else if (req.body.photo && req.body.photo.startsWith('data:image')) {
      const base64Data = req.body.photo.replace(/^data:image\/\w+;base64,/, "");
      const ext = req.body.photo.substring(req.body.photo.indexOf("/") + 1, req.body.photo.indexOf(";"));
      const filename = `student-capture-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      const uploadDir = path.join(__dirname, '../uploads/students');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, filename), base64Data, 'base64');
      photo = `/uploads/students/${filename}`;
    } else if (req.body.photo) {
      photo = req.body.photo;
    }

    const defaultPassword = password || 'student123';

    const student = await Student.create({
      name,
      photo,
      rollNumber: studentId, // sync for backward compatibility
      studentId,
      course,
      batch,
      email: email.toLowerCase().trim(),
      password: defaultPassword,
      phone,
      address,
      joiningDate: new Date(joiningDate),
      status: status !== undefined ? (status === 'true' || status === true) : true
    });

    const returnedStudent = student.toObject();
    delete returnedStudent.password;

    res.status(201).json(returnedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error: error.message });
  }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private (Admin Only)
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const { name, course, batch, email, phone, address, joiningDate, status, password, studentId } = req.body;

    // Check unique email
    if (email && email.toLowerCase().trim() !== student.email) {
      const emailExists = await Student.findOne({ email: email.toLowerCase().trim() });
      if (emailExists) {
        return res.status(400).json({ message: 'A student with this Email already exists' });
      }
      student.email = email.toLowerCase().trim();
    }

    // Check unique studentId
    if (studentId && studentId.trim() !== student.studentId) {
      const idExists = await Student.findOne({ studentId: studentId.trim() });
      if (idExists) {
        return res.status(400).json({ message: 'A student with this Student ID already exists' });
      }
      student.studentId = studentId.trim();
      student.rollNumber = studentId.trim(); // sync
    }

    if (name) student.name = name;
    if (course) student.course = course;
    if (batch) student.batch = batch;
    if (phone) student.phone = phone;
    if (address) student.address = address;
    if (joiningDate) student.joiningDate = new Date(joiningDate);
    if (password) student.password = password; // pre-save will hash

    if (status !== undefined) {
      student.status = status === 'true' || status === true;
    }

    // Handle image file upload OR raw image path
    if (req.file) {
      if (student.photo) {
        deletePhotoFile(student.photo);
      }
      student.photo = `/uploads/students/${req.file.filename}`;
    } else if (req.body.photo && req.body.photo.startsWith('data:image')) {
      if (student.photo) {
        deletePhotoFile(student.photo);
      }
      const base64Data = req.body.photo.replace(/^data:image\/\w+;base64,/, "");
      const ext = req.body.photo.substring(req.body.photo.indexOf("/") + 1, req.body.photo.indexOf(";"));
      const filename = `student-capture-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      const uploadDir = path.join(__dirname, '../uploads/students');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, filename), base64Data, 'base64');
      student.photo = `/uploads/students/${filename}`;
    } else if (req.body.photo !== undefined) {
      if (req.body.photo !== student.photo) {
        deletePhotoFile(student.photo);
      }
      student.photo = req.body.photo;
    }

    const updatedStudent = await student.save();
    const returnedStudent = updatedStudent.toObject();
    delete returnedStudent.password;

    res.json(returnedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private (Admin Only)
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Delete photo file
    if (student.photo) {
      deletePhotoFile(student.photo);
    }

    await Student.deleteOne({ _id: req.params.id });
    res.json({ message: 'Student profile removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
};
