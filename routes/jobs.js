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
    res.json(jobs || []);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

// Get active jobs only (public)
router.get('/active', async (req, res) => {
  try {
    console.log('Fetching active jobs...');
    const jobs = await Job.find({ active: true }).sort('-createdAt');
    console.log('Found active jobs:', jobs);
    res.json(jobs || []);
  } catch (error) {
    console.error('Error fetching active jobs:', error);
    res.status(500).json({ message: 'Failed to fetch active jobs', error: error.message });
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
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Failed to fetch job', error: error.message });
  }
});

// Create job (temporarily public for testing)
router.post('/', async (req, res) => {
  try {
    console.log('Creating job with data:', req.body);
    const job = new Job(req.body);
    await job.save();
    console.log('Created job:', job);
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ message: 'Failed to create job', error: error.message });
  }
});

// Update job (temporarily public for testing)
router.patch('/:id', async (req, res) => {
  try {
    console.log('Updating job:', req.params.id, 'with data:', req.body);
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Updated job:', job);
    res.json(job);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(400).json({ message: 'Failed to update job', error: error.message });
  }
});

// Delete job (temporarily public for testing)
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting job:', req.params.id);
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Deleted job:', job);
    res.json({ message: 'Job deleted successfully', job });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Failed to delete job', error: error.message });
  }
});

module.exports = router; 