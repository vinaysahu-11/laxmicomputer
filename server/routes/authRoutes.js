const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'change-this-secret', {
    expiresIn: '30d'
  });
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email/ID and password' });
    }

    let user = null;
    let role = '';

    const credential = email.trim();

    if (credential.includes('@')) {
      // 1. Check User (Admin)
      user = await User.findOne({ email: credential.toLowerCase() });
      if (user) {
        role = user.role;
      } else {
        // 2. Check Student
        user = await Student.findOne({ email: credential.toLowerCase() });
        if (user) {
          role = 'student';
        } else {
          // 3. Check Teacher
          user = await Teacher.findOne({ email: credential.toLowerCase() });
          if (user) {
            role = 'teacher';
          }
        }
      }
    } else if (credential.startsWith('STU-')) {
      // Check Student by studentId
      user = await Student.findOne({ studentId: credential });
      if (user) {
        role = 'student';
      }
    } else if (credential.startsWith('TCH-')) {
      // Check Teacher by teacherId
      user = await Teacher.findOne({ teacherId: credential });
      if (user) {
        role = 'teacher';
      }
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    // Check status (in User it is 'active'/'inactive', in Student/Teacher it is Boolean)
    const isInactive = user.status === 'inactive' || user.status === false;
    if (isInactive) {
      return res.status(401).json({ message: 'Access Denied: This account has been deactivated.' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email || '',
      role: role || user.role || 'student',
      studentId: user.studentId || '',
      teacherId: user.teacherId || '',
      profilePhoto: user.photo || user.profilePhoto || '',
      status: user.status,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server login error', error: error.message });
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Profile retrieval error', error: error.message });
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const credential = email.toLowerCase().trim();
    const admin = await User.findOne({ email: credential });
    const student = await Student.findOne({ email: credential });
    const teacher = await Teacher.findOne({ email: credential });

    if (!admin && !student && !teacher) {
      return res.status(404).json({ message: 'No account found with this email address' });
    }

    res.json({ 
      message: 'Password reset link sent to your email. (Use simulation reset code: 123456)',
      resetCode: '123456'
    });
  } catch (error) {
    res.status(500).json({ message: 'Forgot password error', error: error.message });
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { email, password, code } = req.body;
    if (!email || !password || !code) {
      return res.status(400).json({ message: 'Email, password, and reset code are required' });
    }

    if (code !== '123456') {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    const credential = email.toLowerCase().trim();
    let user = await User.findOne({ email: credential });
    if (!user) {
      user = await Student.findOne({ email: credential });
    }
    if (!user) {
      user = await Teacher.findOne({ email: credential });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = password; // pre-save hook will hash
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Reset password error', error: error.message });
  }
});

// ==========================================
// ADMIN CONTROLLED USER MANAGEMENT ENDPOINTS
// ==========================================

// @desc    Get all user accounts across all collections (Admin, Teacher, Student)
// @route   GET /api/auth/users
// @access  Private (Admin Only)
router.get('/users', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const admins = await User.find({}).select('-password');
    const teachers = await Teacher.find({}).select('-password');
    const students = await Student.find({}).select('-password');
    
    const unifiedUsers = [
      ...admins.map(u => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status === 'active',
        userId: u.email,
        details: 'System Admin'
      })),
      ...teachers.map(t => ({
        _id: t._id,
        name: t.name,
        email: t.email,
        role: 'teacher',
        status: t.status,
        userId: t.teacherId,
        details: t.subject || 'Faculty'
      })),
      ...students.map(s => ({
        _id: s._id,
        name: s.name,
        email: s.email,
        role: 'student',
        status: s.status,
        userId: s.studentId,
        details: s.course || 'Enrolled'
      }))
    ];
    
    res.json(unifiedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user index', error: error.message });
  }
});

// @desc    Create user account
// @route   POST /api/auth/users
// @access  Private (Admin Only)
router.post('/users', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, email, password, role, status, customField } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Required fields: name, email, password, role' });
    }
    
    const emailQuery = { email: email.toLowerCase().trim() };
    const adminExists = await User.findOne(emailQuery);
    const teacherExists = await Teacher.findOne(emailQuery);
    const studentExists = await Student.findOne(emailQuery);
    
    if (adminExists || teacherExists || studentExists) {
      return res.status(400).json({ message: 'An account already exists with this email address' });
    }
    
    if (role === 'admin') {
      await User.create({
        name,
        email,
        password,
        status: status === false ? 'inactive' : 'active'
      });
    } else if (role === 'teacher') {
      await Teacher.create({
        name,
        email,
        password,
        subject: customField || 'Computer Science',
        qualification: 'B.Tech/MCA',
        experience: '2 Years',
        phone: '1234567890',
        status: status !== false
      });
    } else if (role === 'student') {
      await Student.create({
        name,
        email,
        password,
        course: customField || 'Basic Computer',
        batch: 'Jan 2024 (Morning)',
        phone: '1234567890',
        address: 'Institute Student Profile',
        joiningDate: new Date(),
        status: status !== false
      });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    res.status(201).json({ message: 'User account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user account', error: error.message });
  }
});

// @desc    Update user details, deactivation status, or password reset
// @route   PUT /api/auth/users/:id
// @access  Private (Admin Only)
router.put('/users/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const { status, password, name, email } = req.body;
    let user = null;
    let foundIn = '';
    
    user = await User.findById(req.params.id);
    if (user) foundIn = 'admin';
    
    if (!user) {
      user = await Teacher.findById(req.params.id);
      if (user) foundIn = 'teacher';
    }
    
    if (!user) {
      user = await Student.findById(req.params.id);
      if (user) foundIn = 'student';
    }
    
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase().trim();
    if (status !== undefined) {
      if (foundIn === 'admin') {
        user.status = status === true || status === 'active' ? 'active' : 'inactive';
      } else {
        user.status = status === true || status === 'active';
      }
    }
    if (password) {
      user.password = password; // pre-save will hash
    }
    
    await user.save();
    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
});

// @desc    Delete user account
// @route   DELETE /api/auth/users/:id
// @access  Private (Admin Only)
router.delete('/users/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    let result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      result = await Teacher.deleteOne({ _id: req.params.id });
    }
    if (result.deletedCount === 0) {
      result = await Student.deleteOne({ _id: req.params.id });
    }
    
    res.json({ message: 'User account removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing user account', error: error.message });
  }
});

module.exports = router;
