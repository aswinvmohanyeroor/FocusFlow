const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes'); // Move this below express
dotenv.config();

const app = express(); // ✅ This must come before any app.use()

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // ✅ Now it's safe

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.get('/', (req, res) => {
  res.send('FocusFlow API is live 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// If you have a reminder job:
require('./reminderJob');
