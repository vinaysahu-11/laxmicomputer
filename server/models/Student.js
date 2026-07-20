const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  photo: {
    type: String,
    default: ''
  },
  rollNumber: {
    type: String,
    default: ''
  },
  studentId: {
    type: String,
    unique: true,
    trim: true
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  batch: {
    type: String,
    required: [true, 'Batch is required'],
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
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  joiningDate: {
    type: Date,
    required: [true, 'Joining date is required']
  },
  role: {
    type: String,
    enum: ['student'],
    default: 'student'
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto-generate studentId and rollNumber on validation if empty
studentSchema.pre('validate', async function(next) {
  if (!this.studentId) {
    try {
      const Student = mongoose.model('Student');
      const lastStudent = await Student.findOne({ studentId: /^STU-2026-/ }).sort({ studentId: -1 });
      let newNum = 1;
      if (lastStudent && lastStudent.studentId) {
        const parts = lastStudent.studentId.split('-');
        const lastNum = parseInt(parts[2], 10);
        if (!isNaN(lastNum)) {
          newNum = lastNum + 1;
        }
      }
      this.studentId = `STU-2026-${String(newNum).padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  if (!this.rollNumber) {
    this.rollNumber = this.studentId;
  }
  if (!this.password) {
    this.password = 'student123';
  }
  next();
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
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
studentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
