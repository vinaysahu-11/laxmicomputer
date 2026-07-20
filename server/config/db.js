const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Automatic admin seeding if user database is empty
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
      console.log('User database empty. Seeding default system administrator...');
      await User.create({
        name: 'Admin',
        email: 'admin@laxmi.com',
        password: 'admin123', // User schema pre-save hook hashes this password automatically
        role: 'admin',
        status: 'active'
      });
      console.log('Default admin seeded successfully: admin@laxmi.com / admin123');
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
