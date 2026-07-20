const Teacher = require('../models/Teacher');
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
      console.error('Failed to delete teacher photo file:', err);
    }
  }
};

// Helper to auto-generate Teacher ID TCH-2026-001, etc.
const generateTeacherId = async () => {
  const lastTeacher = await Teacher.findOne({ teacherId: /^TCH-2026-/ }).sort({ teacherId: -1 });
  let newNum = 1;
  if (lastTeacher && lastTeacher.teacherId) {
    const parts = lastTeacher.teacherId.split('-');
    const lastNum = parseInt(parts[2], 10);
    if (!isNaN(lastNum)) {
      newNum = lastNum + 1;
    }
  }
  return `TCH-2026-${String(newNum).padStart(3, '0')}`;
};

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Public
exports.getTeachers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === 'true') {
      filter.status = true;
    }
    const teachers = await Teacher.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error: error.message });
  }
};

// @desc    Create a teacher
// @route   POST /api/teachers
// @access  Private (Admin Only)
exports.createTeacher = async (req, res) => {
  try {
    const { name, qualification, subject, experience, bio, email, phone, socialLinks, status, password } = req.body;

    if (!name || !qualification || !subject || !experience || !email || !phone) {
      return res.status(400).json({ message: 'All fields except bio and social links are required' });
    }

    // Check if email already exists
    const emailExists = await Teacher.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ message: 'A teacher with this email already exists' });
    }

    // Auto-generate Teacher ID
    const teacherId = await generateTeacherId();

    let photo = '';
    if (req.file) {
      photo = `/uploads/teachers/${req.file.filename}`;
    }

    let parsedSocialLinks = { facebook: '', twitter: '', linkedin: '' };
    if (socialLinks) {
      try {
        parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
      } catch (err) {
        console.error('Failed to parse social links JSON:', err);
      }
    }

    const defaultPassword = password || 'teacher123';

    const teacher = await Teacher.create({
      name,
      photo,
      teacherId,
      qualification,
      subject,
      experience,
      bio: bio || '',
      email: email.toLowerCase(),
      password: defaultPassword,
      phone,
      socialLinks: parsedSocialLinks,
      status: status !== undefined ? (status === 'true' || status === true) : true
    });

    const returnedTeacher = teacher.toObject();
    delete returnedTeacher.password;

    res.status(201).json(returnedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Error creating teacher', error: error.message });
  }
};

// @desc    Update a teacher
// @route   PUT /api/teachers/:id
// @access  Private (Admin Only)
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }

    const { name, qualification, subject, experience, bio, email, phone, socialLinks, status, password, teacherId } = req.body;

    if (email && email.toLowerCase() !== teacher.email) {
      const emailExists = await Teacher.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ message: 'A teacher with this email already exists' });
      }
      teacher.email = email.toLowerCase();
    }

    // Check unique teacherId
    if (teacherId && teacherId.trim() !== teacher.teacherId) {
      const idExists = await Teacher.findOne({ teacherId: teacherId.trim() });
      if (idExists) {
        return res.status(400).json({ message: 'A teacher with this Teacher ID already exists' });
      }
      teacher.teacherId = teacherId.trim();
    }

    if (name) teacher.name = name;
    if (qualification) teacher.qualification = qualification;
    if (subject) teacher.subject = subject;
    if (experience) teacher.experience = experience;
    if (bio !== undefined) teacher.bio = bio;
    if (phone) teacher.phone = phone;
    if (password) teacher.password = password; // pre-save will hash

    if (status !== undefined) {
      teacher.status = status === 'true' || status === true;
    }

    if (socialLinks) {
      try {
        const parsed = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
        teacher.socialLinks = {
          facebook: parsed.facebook !== undefined ? parsed.facebook : teacher.socialLinks.facebook,
          twitter: parsed.twitter !== undefined ? parsed.twitter : teacher.socialLinks.twitter,
          linkedin: parsed.linkedin !== undefined ? parsed.linkedin : teacher.socialLinks.linkedin
        };
      } catch (err) {
        console.error('Failed to parse social links JSON:', err);
      }
    }

    if (req.file) {
      if (teacher.photo) {
        deletePhotoFile(teacher.photo);
      }
      teacher.photo = `/uploads/teachers/${req.file.filename}`;
    }

    const updatedTeacher = await teacher.save();
    const returnedTeacher = updatedTeacher.toObject();
    delete returnedTeacher.password;

    res.json(returnedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher', error: error.message });
  }
};

// @desc    Delete a teacher
// @route   DELETE /api/teachers/:id
// @access  Private (Admin Only)
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }

    // Delete photo file
    if (teacher.photo) {
      deletePhotoFile(teacher.photo);
    }

    await Teacher.deleteOne({ _id: req.params.id });
    res.json({ message: 'Teacher profile removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error: error.message });
  }
};
