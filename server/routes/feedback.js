const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
