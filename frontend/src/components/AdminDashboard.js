import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

  const token = localStorage.getItem('token');

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(() => toast.error('Unauthorized or server error'));
  };

  useEffect(fetchUsers, []);

  const handleAddUser = () => {
    axios.post('http://localhost:5000/api/admin/users', form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      toast.success('User added');
      setForm({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
    })
    .catch(() => toast.error('Failed to add user'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete user?')) {
      axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        toast.success('User deleted');
        fetchUsers();
      })
      .catch(() => toast.error('Failed to delete user'));
    }
  };

  const handleToggleRole = (id) => {
    axios.patch(`http://localhost:5000/api/admin/users/${id}/toggle-role`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      toast.success('Role updated');
      fetchUsers();
    })
    .catch(() => toast.error('Failed to change role'));
  };

  return (
    <div>
      <h2>👥 Admin Dashboard</h2>

      <h3>Add User</h3>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>

      <h3>All Users</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleDelete(u._id)}>🗑 Delete</button>
                <button onClick={() => handleToggleRole(u._id)}>🔄 Toggle Role</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
