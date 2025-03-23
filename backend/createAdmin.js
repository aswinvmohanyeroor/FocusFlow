// createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Make sure path is correct

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await User.findOne({ email: 'admin@focusflow.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists:', existingAdmin.email);
      return mongoose.disconnect();
    }

    const admin = new User({
      name: 'Admin',
      email: 'admin@focusflow.com',
      password: 'admin123', // 👈 this will be hashed via pre-save hook
      role: 'admin',
    });

    await admin.save(); // ✅ will run password hashing
    console.log('✅ Admin created successfully: admin@focusflow.com');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    mongoose.disconnect();
  }
};

createAdmin();

