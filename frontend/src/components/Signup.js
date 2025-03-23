import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      login(res.data);
      toast.success('✅ Registered successfully!');
      navigate('/tasks');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed!');
    }
  };

  return (
    <div className="form-container">
      <h2>📝 Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Create Account</button>
        <p style={{ marginTop: '10px' }}>
  Already registered? <a href="/">Login</a>
</p>

      </form>
    </div>
  );
};

export default Signup;
