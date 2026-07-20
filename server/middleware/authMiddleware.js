const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decrypt and verify payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change-this-secret');

      // Check User (Admin)
      let currentUser = await User.findById(decoded.id).select('-password');
      let role = 'admin';

      // Check Student
      if (!currentUser) {
        currentUser = await Student.findById(decoded.id).select('-password');
        if (currentUser) {
          role = 'student';
        }
      }

      // Check Teacher
      if (!currentUser) {
        currentUser = await Teacher.findById(decoded.id).select('-password');
        if (currentUser) {
          role = 'teacher';
        }
      }

      if (!currentUser) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // In User schema, status is enum ['active', 'inactive']. In Student/Teacher, it is Boolean.
      const isInactive = currentUser.status === 'inactive' || currentUser.status === false;
      if (isInactive) {
        return res.status(401).json({ message: 'Access Denied: This user account has been deactivated' });
      }

      // Format role property just in case
      currentUser = currentUser.toObject();
      currentUser.role = currentUser.role || role;

      req.user = currentUser;
      next();
    } catch (error) {
      console.error('Token authentication error:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
