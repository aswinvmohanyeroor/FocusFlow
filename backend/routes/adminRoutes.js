const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// GET all users (admin only)
router.get('/users', protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
// Create a new user
router.post('/users', protect, isAdmin, async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: 'User already exists' });
  
      const newUser = new User({ name, email, password, role });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  
  // Delete user by ID
  router.delete('/users/:id', protect, isAdmin, async (req, res) => {
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
  
  // Toggle role (user <-> admin)
  router.patch('/users/:id/toggle-role', protect, isAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      user.role = user.role === 'admin' ? 'user' : 'admin';
      await user.save();
      res.json({ message: `Role changed to ${user.role}` });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update role' });
    }
  });
  
