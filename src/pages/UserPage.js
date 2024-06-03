// src/pages/UserPage.js

import React, { useEffect, useState } from 'react';
import { get, post, put, del } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import List from '../components/List';
import styles from '../App.module.css';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    get('/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    if (id) {
      get(`/user/${id}`)
        .then(response => setForm(response.data))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Please fill out all fields.');
      return;
    }
    if (editingId) {
      put(`/user/${editingId}`, form)
        .then(() => {
          setUsers(users.map(user => (user._id === editingId ? form : user)));
          setForm({ name: '', email: '' });
          setEditingId(null);
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      post('/user', form)
        .then(response => {
          setUsers([...users, response.data]);
          setForm({ name: '', email: '' });
        })
        .catch(error => console.error('Error creating user:', error));
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user._id);
  };

  const handleDelete = (id) => {
    del(`/user/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <Form onSubmit={handleSubmit}>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" />
        <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
      </Form>
      <List 
        items={users} 
        renderItem={(user) => (
          <div>
            {user.name} ({user.email})
            <Button onClick={() => handleEdit(user)}>Edit</Button>
            <Button onClick={() => handleDelete(user._id)}>Delete</Button>
          </div>
        )}
      />
      <Link to="/">Back</Link>
    </div>
  );
};

export default UserPage;
