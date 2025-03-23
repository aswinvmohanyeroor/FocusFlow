const taskRoutes = require('./routes/taskRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Order matters!
app.use(cors());
app.use(express.json()); // 🔥 move this BEFORE your routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.get('/', (req, res) => {
  res.send('FocusFlow API is live 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Email reminder cron job
require('./reminderJob');
