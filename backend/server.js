const taskRoutes = require('./routes/taskRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use('/api/tasks', taskRoutes);
app.use(express.json());

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
