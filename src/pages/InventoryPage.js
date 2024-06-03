// src/pages/InventoryPage.js

import React, { useEffect, useState } from 'react';
import { get, post, put, del } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import List from '../components/List';
import styles from '../App.module.css';

const InventoryPage = () => {
  const [inventories, setInventories] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    get('/inventory')
      .then(response => setInventories(response.data))
      .catch(error => console.error('Error fetching inventories:', error));
  }, []);

  useEffect(() => {
    if (id) {
      get(`/inventory/${id}`)
        .then(response => setForm({
          name: response.data.name,
          quantity: response.data.quantity
        }))
        .catch(error => console.error('Error fetching inventory:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data on submit:', form); // Add logging
    if (!form.name || !form.quantity) {
      alert('Please fill out all fields.');
      return;
    }
    if (editingId) {
      put(`/inventory/${editingId}`, form)
        .then(() => {
          setInventories(inventories.map(inventory => (inventory._id === editingId ? form : inventory)));
          setForm({ name: '', quantity: '' });
          setEditingId(null);
        })
        .catch(error => console.error('Error updating inventory:', error));
    } else {
      post('/inventory', form)
        .then(response => {
          console.log('Response data:', response.data); // Add logging
          setInventories([...inventories, response.data]);
          setForm({ name: '', quantity: '' });
        })
        .catch(error => console.error('Error creating inventory:', error));
    }
  };

  const handleEdit = (inventory) => {
    setForm({ name: inventory.name, quantity: inventory.quantity });
    setEditingId(inventory._id);
  };

  const handleDelete = (id) => {
    del(`/inventory/${id}`)
      .then(() => setInventories(inventories.filter(inventory => inventory._id !== id)))
      .catch(error => console.error('Error deleting inventory:', error));
  };

  return (
    <div className={styles.container}>
      <h1>Inventories</h1>
      <Form onSubmit={handleSubmit}>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} type="number" />
        <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
      </Form>
      <List 
        items={inventories} 
        renderItem={(inventory) => (
          <div>
            {inventory.name} ({inventory.quantity})
            <Button onClick={() => handleEdit(inventory)}>Edit</Button>
            <Button onClick={() => handleDelete(inventory._id)}>Delete</Button>
          </div>
        )}
      />
      <Link to="/">Back</Link>
    </div>
  );
};

export default InventoryPage;
