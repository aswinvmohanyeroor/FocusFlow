import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const TaskList = () => {
  const { user } = useAuth(); // ✅ Get user & token from context
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    email: ''
  });

  useEffect(() => {
    if (!user?.token) return;

    axios
      .get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => setTasks(res.data))
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch tasks');
      });
  }, [user]);

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
      .patch(`http://localhost:5000/api/tasks/${id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(() => window.location.reload())
      .catch(err => toast.error('Error updating task'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios
        .delete(`http://localhost:5000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then(() => window.location.reload())
        .catch(err => toast.error('Error deleting task'));
    }
  };

  return (
    <div>
      <h2>📝 Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
              {editingTaskId === task._id ? (
                <div>
                  <input name="title" value={editFormData.title} onChange={handleEditChange} />
                  <input name="description" value={editFormData.description} onChange={handleEditChange} />
                  <input name="dueDate" type="datetime-local" value={editFormData.dueDate?.slice(0, 16)} onChange={handleEditChange} />
                  <input name="email" value={editFormData.email} onChange={handleEditChange} />
                  <button onClick={() => handleEditSubmit(task._id)}>💾 Save</button>
                  <button onClick={() => setEditingTaskId(null)}>❌ Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{task.title}</strong> — {task.description} <br />
                  Due: {new Date(task.dueDate).toLocaleString()} <br />
                  Status: {task.completed ? '✅ Completed' : '⏳ Pending'} <br />
                  {!task.completed && (
                    <>
                      <button
                        className="complete"
                        onClick={() => {
                          axios
                            .patch(`http://localhost:5000/api/tasks/${task._id}/complete`, {}, {
                              headers: {
                                Authorization: `Bearer ${user.token}`
                              }
                            })
                            .then(() => window.location.reload());
                        }}
                      >
                        ✅ Complete
                      </button>
                      <button className="edit" onClick={() => startEdit(task)}>🖊 Edit</button>
                      <button className="delete" onClick={() => handleDelete(task._id)}>🗑 Delete</button>
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
