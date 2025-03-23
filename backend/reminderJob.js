const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Task = require('./models/Task');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Email transporter setup (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Schedule: every minute
cron.schedule('* * * * *', async () => {
  console.log('⏰ Running email reminder job...');

  const now = new Date();
  const soon = new Date(now.getTime() + 15 * 60 * 1000); // 15 mins from now

  try {
    const tasks = await Task.find({
      dueDate: { $lte: soon, $gte: now },
      completed: false,
      reminderSent: false,
    });

    for (const task of tasks) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: task.email,
        subject: '⏰ FocusFlow Task Reminder',
        text: `Reminder: "${task.title}" is due soon.\n\nDescription: ${task.description}`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Reminder sent to ${task.email} for "${task.title}"`);

      // Mark as reminder sent
      task.reminderSent = true;
      await task.save();
    }
  } catch (err) {
    console.error('Reminder job error:', err.message);
  }
});
