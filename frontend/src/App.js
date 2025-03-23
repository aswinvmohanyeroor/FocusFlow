import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

<ToastContainer position="top-right" autoClose={2500} />

function App() {
  return (
    <Router>
      <div className="App">
        <h1>📋 FocusFlow</h1>

        <nav className="nav">
          <Link to="/">Add Task</Link>
          <Link to="/tasks">Task List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<TaskForm />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
       


      </div>
    </Router>
  );
}

export default App;

