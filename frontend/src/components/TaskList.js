import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    email: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/tasks')
      .then((res) => setTasks(res.data))
      .catch(() => toast.error('❌ Failed to fetch tasks'));
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
    axios
      .patch(`http://localhost:5000/api/tasks/${id}`, editFormData)
      .then(() => {
        toast.success('💾 Task updated!');
        window.location.reload();
      })
      .catch((err) => toast.error('❌ Update failed'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios
        .delete(`http://localhost:5000/api/tasks/${id}`)
        .then(() => {
          toast.success('🗑️ Task deleted!');
          window.location.reload();
        })
        .catch((err) => toast.error('❌ Delete failed'));
    }
  };

  const handleComplete = (id) => {
    axios
      .patch(`http://localhost:5000/api/tasks/${id}/complete`)
      .then(() => {
        toast.success('✅ Task marked as complete!');
        window.location.reload();
      })
      .catch((err) => toast.error('❌ Completion failed'));
  };

  // 🔍 Search + Filter
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h2>📋 Task List</h2>

      {/* 🔍 Search + Filter */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button onClick={() => setFilter('all')}>📋 All</button>
        <button onClick={() => setFilter('completed')}>✅ Completed</button>
        <button onClick={() => setFilter('pending')}>⏳ Pending</button>
      </div>

      {/* 🧾 Task List */}
      {filteredTasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
              {editingTaskId === task._id ? (
                <div>
                  <input name="title" value={editFormData.title} onChange={handleEditChange} />
                  <input name="description" value={editFormData.description} onChange={handleEditChange} />
                  <input
                    name="dueDate"
                    type="datetime-local"
                    value={editFormData.dueDate?.slice(0, 16)}
                    onChange={handleEditChange}
                  />
                  <input name="email" value={editFormData.email} onChange={handleEditChange} />
                  <button onClick={() => handleEditSubmit(task._id)}>💾 Save</button>
                  <button onClick={() => setEditingTaskId(null)}>❌ Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{task.title}</strong> — {task.description}
                  <br />
                  Due: {new Date(task.dueDate).toLocaleString()}
                  <br />
                  Status: {task.completed ? '✅ Completed' : '⏳ Pending'}
                  <br />
                  {!task.completed && (
                    <>
                      <button className="complete" onClick={() => handleComplete(task._id)}>✅ Complete</button>
                      <button className="edit" onClick={() => startEdit(task)}>🖊 Edit</button>
                      <button className="delete" onClick={() => handleDelete(task._id)}>🗑️ Delete</button>
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
