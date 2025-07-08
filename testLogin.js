require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const Job = require('./models/Job');

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

const testJobs = [
  {
    title: "Senior Full Stack Developer",
    description: "Looking for an experienced full-stack developer to lead development of enterprise applications.",
    requirements: ["React", "Node.js", "Python", "AWS", "MongoDB"],
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "5+ years",
    salary: "Competitive",
    active: true
  },
  {
    title: "UI/UX Designer",
    description: "Seeking a creative designer to craft beautiful and intuitive user experiences.",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "3+ years",
    salary: "Based on experience",
    active: true
  }
];

const addTestJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innomatrics');
    console.log('Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Add test jobs
    const jobs = await Job.insertMany(testJobs);
    console.log('Added test jobs:', jobs);

    await mongoose.connection.close();
    console.log('Done');
  } catch (error) {
    console.error('Error:', error);
  }
};

testLogin();
addTestJobs(); 