const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Feedback = require('../models/Feedback');
const verifyToken = require('../middleware/auth');

// POST /admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// GET /admin/feedbacks
router.get('/feedbacks', verifyToken, async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

// BONUS: DELETE feedback by ID
router.delete('/feedback/:id', verifyToken, async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ message: "Feedback deleted" });
});

module.exports = router;
