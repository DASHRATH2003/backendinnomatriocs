require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innomatrics', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const newPassword = 'Admin@123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const result = await User.updateOne(
      { email: 'dashrathkumardbg2003@gmail.com' },
      { 
        $set: { 
          password: hashedPassword
        } 
      }
    );

    if (result.modifiedCount > 0) {
      console.log('Password successfully reset!');
      console.log('New password is:', newPassword);
    } else {
      console.log('No user was updated');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
};

resetPassword(); 