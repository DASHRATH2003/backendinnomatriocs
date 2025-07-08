require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innomatrics', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const adminUser = new User({
      email: 'dashrathkumardbg2003@gmail.com',
      password: 'Admin@123',
      fullName: 'Dashrath yadav',
      isAdmin: true
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin(); 

