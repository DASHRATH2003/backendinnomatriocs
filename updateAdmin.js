require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const updateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innomatrics', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const result = await User.updateOne(
      { email: 'dashrathkumardbg2003@gmail.com' },
      { 
        $set: { 
          isAdmin: true,
          fullName: 'Dashrath yadav'
        } 
      }
    );

    if (result.modifiedCount > 0) {
      console.log('User successfully updated to admin!');
    } else {
      console.log('No user was updated');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin user:', error);
    process.exit(1);
  }
};

updateAdmin(); 