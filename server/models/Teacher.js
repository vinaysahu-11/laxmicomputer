const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  photo: {
    type: String,
    default: ''
  },
  teacherId: {
    type: String,
    unique: true,
    trim: true
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject/specialty is required'],
    trim: true
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    trim: true
  },
  bio: {
    type: String,
    default: '',
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  role: {
    type: String,
    enum: ['teacher'],
    default: 'teacher'
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto-generate teacherId on validation if empty
teacherSchema.pre('validate', async function(next) {
  if (!this.teacherId) {
    try {
      const Teacher = mongoose.model('Teacher');
      const lastTeacher = await Teacher.findOne({ teacherId: /^TCH-2026-/ }).sort({ teacherId: -1 });
      let newNum = 1;
      if (lastTeacher && lastTeacher.teacherId) {
        const parts = lastTeacher.teacherId.split('-');
        const lastNum = parseInt(parts[2], 10);
        if (!isNaN(lastNum)) {
          newNum = lastNum + 1;
        }
      }
      this.teacherId = `TCH-2026-${String(newNum).padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  if (!this.password) {
    this.password = 'teacher123';
  }
  next();
});

// Hash password before saving
teacherSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with hashed password
teacherSchema.methods.comparePassword = async function(enteredPassword) {
  try {
    if (this.password && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) {
      return await bcrypt.compare(enteredPassword, this.password);
    }
  } catch (err) {
    // Fallback
  }
  return enteredPassword === this.password;
};

module.exports = mongoose.model('Teacher', teacherSchema);
