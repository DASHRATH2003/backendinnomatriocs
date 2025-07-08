require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const initialJobs = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "5+ years",
    skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
    description: "Looking for an experienced full-stack developer to lead development of enterprise applications.",
    salary: "Based on experience"
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "3+ years",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    description: "Seeking a creative designer to craft beautiful and intuitive user experiences.",
    salary: "Based on experience"
  },
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "2+ years",
    skills: ["SEO", "Social Media", "Content Marketing", "Google Analytics", "Email Marketing"],
    description: "Join our marketing team to drive growth through digital channels.",
    salary: "Based on experience"
  },
  {
    title: "Mobile App Developer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "3+ years",
    skills: ["React Native", "iOS", "Android", "API Integration", "App Store Deployment"],
    description: "Build next-generation mobile applications for our clients.",
    salary: "Based on experience"
  }
];

const createJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innomatrics', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Delete existing jobs
    await Job.deleteMany({});
    console.log('🗑️ Cleared existing jobs');

    // Create new jobs
    const jobs = await Job.create(initialJobs);
    console.log('✨ Created new jobs:', jobs);

    console.log('✅ Job creation completed successfully');
  } catch (error) {
    console.error('❌ Error creating jobs:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('📡 MongoDB connection closed');
  }
};

// Run the script
createJobs(); 