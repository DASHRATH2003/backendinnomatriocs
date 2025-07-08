const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = 'mongodb+srv://inno:inno123@cluster0.jzdtpg3.mongodb.net/Innomatrics?retryWrites=true&w=majority';

async function clearDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Delete all users
    await User.deleteMany({});
    console.log('All users deleted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

clearDatabase(); 