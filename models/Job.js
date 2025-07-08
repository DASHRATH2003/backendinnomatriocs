const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    default: 'Remote / Hybrid'
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true,
    default: 'Full-time'
  },
  experience: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  salary: {
    type: String,
    default: 'Based on experience'
  },
  active: {
    type: Boolean,
    default: true
  },
  posted: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 