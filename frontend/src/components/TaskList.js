import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id} style={{ marginBottom: '12px' }}>
              <strong>{task.title}</strong> — {task.description} <br />
              Due: {new Date(task.dueDate).toLocaleString()} <br />
              Status: {task.completed ? '✅ Completed' : '⏳ Pending'} <br />
              {!task.completed && (
                <button
                  onClick={() => {
                    axios.patch(`http://localhost:5000/api/tasks/${task._id}/complete`)
                      .then(() => window.location.reload())
                      .catch(err => alert('Error: ' + err.message));
                  }}
                >
                  Mark as Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
