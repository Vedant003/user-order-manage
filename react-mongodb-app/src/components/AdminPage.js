import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    const newUser = { name: newName, email: newEmail };
    await axios.post('/api/users', newUser);
    fetchUsers();
    setNewName('');
    setNewEmail('');
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`/api/users/${id}`);
    fetchUsers();
  };

  const handleEditUser = async (id, newName, newEmail) => {
    const updatedUser = { name: newName, email: newEmail };
    await axios.put(`/api/users/${id}`, updatedUser);
    fetchUsers();
  };

  // const handleAddUser = async () => {
  //   try {
  //     const newUser = { name: newName, email: newEmail };
  //     const response = await axios.post('/api/users', newUser);
  //     // Handle successful response
  //     fetchUsers();
  //     setNewName('');
  //     setNewEmail('');
  //     console.log('User added successfully:', response.data);
  //   } catch (error) {
  //     // Handle specific error types
  //     if (error.response && error.response.status === 400) {
  //       // Handle bad request errors, e.g., validation errors
  //       alert('Invalid input. Please check your data.');
  //     } else if (error.response && error.response.status === 500) {
  //       // Handle server errors
  //       alert('Server error. Please try again later.');
  //     } else {
  //       // Handle general network or other errors
  //       alert('An error occurred. Please try again later.');
  //     }
  //     console.error('Error adding user:', error);
  //   }
  // };



  return (
    <div>
      <h2>Admin Page</h2>
      <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
      <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      <button onClick={handleAddUser}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                <button onClick={() => handleEditUser(user._id, user.name, user.email)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;