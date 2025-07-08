require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innomatrics', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const email = 'dashrathkumardbg2003@gmail.com';
    const password = 'Admin@123';

    // Find the user
    const user = await User.findOne({ email });
    console.log('User found:', {
      email: user.email,
      isAdmin: user.isAdmin,
      fullName: user.fullName,
      hashedPassword: user.password
    });

    // Test password comparison
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    // Test direct bcrypt comparison
    const directMatch = await bcrypt.compare(password, user.password);
    console.log('Direct bcrypt comparison:', directMatch);

    process.exit(0);
  } catch (error) {
    console.error('Error testing login:', error);
    process.exit(1);
  }
};

testLogin(); 