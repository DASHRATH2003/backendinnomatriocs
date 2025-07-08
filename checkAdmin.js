require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innomatrics', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const adminUser = await User.findOne({ email: 'dashrathkumardbg2003@gmail.com' });
    if (adminUser) {
      console.log('Admin user found:', {
        email: adminUser.email,
        isAdmin: adminUser.isAdmin,
        fullName: adminUser.fullName
      });
    } else {
      console.log('Admin user not found');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin user:', error);
    process.exit(1);
  }
};

checkAdmin(); 