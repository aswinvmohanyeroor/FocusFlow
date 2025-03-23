import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    email: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setEditFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      email: task.email
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (id) => {
    axios.patch(`http://localhost:5000/api/tasks/${id}`, editFormData)
      .then(() => window.location.reload())
      .catch(err => alert('Error: ' + err.message));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`http://localhost:5000/api/tasks/${id}`)
        .then(() => window.location.reload())
        .catch(err => alert('Error: ' + err.message));
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id} style={{ marginBottom: '12px' }}>
              {editingTaskId === task._id ? (
                <div>
                  <input name="title" value={editFormData.title} onChange={handleEditChange} />
                  <input name="description" value={editFormData.description} onChange={handleEditChange} />
                  <input name="dueDate" type="datetime-local" value={editFormData.dueDate?.slice(0, 16)} onChange={handleEditChange} />
                  <input name="email" value={editFormData.email} onChange={handleEditChange} />
                  <button onClick={() => handleEditSubmit(task._id)}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{task.title}</strong> — {task.description} <br />
                  Due: {new Date(task.dueDate).toLocaleString()} <br />
                  Status: {task.completed ? '✅ Completed' : '⏳ Pending'} <br />
                  {!task.completed && (
                    <>
                      <button onClick={() => {
                        axios.patch(`http://localhost:5000/api/tasks/${task._id}/complete`)
                          .then(() => window.location.reload());
                      }}>
                        Mark as Complete
                      </button>
                      <button onClick={() => startEdit(task)}>Edit</button>
                      <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
