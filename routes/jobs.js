const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { auth, adminOnly } = require('../middleware/auth');

// Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all jobs...');
    const jobs = await Job.find().sort('-createdAt');
    console.log('Found jobs:', jobs);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get active jobs only (public)
router.get('/active', async (req, res) => {
  try {
    console.log('Fetching active jobs...');
    const jobs = await Job.find({ active: true }).sort('-createdAt');
    console.log('Found active jobs:', jobs);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching active jobs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single job (public)
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create job (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update job (admin only)
router.patch('/:id', auth, adminOnly, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete job (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 