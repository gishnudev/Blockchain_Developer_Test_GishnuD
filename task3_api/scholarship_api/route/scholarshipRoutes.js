const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

// POST /scholarships
router.post('/', async (req, res) => {
  const { scholarshipId, title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  try {
    const scholarship = new Scholarship({ scholarshipId, title, description });
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /scholarships
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

