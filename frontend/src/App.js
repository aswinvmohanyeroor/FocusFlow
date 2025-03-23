import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { useAuth } from './context/AuthContext';

const AppContent = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 Redirect if trying to access protected route without login
  useEffect(() => {
    const protectedRoutes = ['/add', '/tasks'];
    if (!user && protectedRoutes.includes(location.pathname)) {
      navigate('/');
    }
  }, [user, location.pathname, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/'); // ✅ Force redirect to login after logout
  };

  return (
    <div className="App">
      <h1>📋 FocusFlow</h1>

      {/* ✅ Show nav only if logged in */}
      {user && (
        <nav className="nav">
          <Link to="/add">Add Task</Link>
          <Link to="/tasks">Task List</Link>
          <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user && (
          <>
            <Route path="/add" element={<TaskForm />} />
            <Route path="/tasks" element={<TaskList />} />
          </>
        )}
        <Route path="*" element={<Login />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
