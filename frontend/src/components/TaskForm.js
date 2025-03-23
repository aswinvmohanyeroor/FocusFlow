import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/tasks', formData)
      .then(() => {
        alert('Task added!');
        window.location.reload(); // quick refresh to reload tasks
      })
      .catch(err => alert('Error: ' + err.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input name="title" placeholder="Title" required onChange={handleChange} /><br />
      <input name="description" placeholder="Description" onChange={handleChange} /><br />
      <input name="dueDate" type="datetime-local" onChange={handleChange} /><br />
      <input name="email" placeholder="Reminder Email" onChange={handleChange} /><br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
