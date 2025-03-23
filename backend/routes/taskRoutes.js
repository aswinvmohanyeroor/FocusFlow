const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// GET tasks for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new task
router.post('/', auth, async (req, res) => {
  const { title, description, dueDate, email } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      email,
      user: req.user._id // 🔐 link task to user
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add PATCH & DELETE routes similarly (optional)

module.exports = router;
