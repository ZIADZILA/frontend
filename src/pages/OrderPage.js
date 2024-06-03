// src/pages/OrderPage.js

import React, { useEffect, useState } from 'react';
import { get, post, put, del } from '../services/api';
import { useParams, Link } from 'react-router-dom'; // Removed useNavigate
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import List from '../components/List';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ productName: '', totalPrice: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    get('/order')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  useEffect(() => {
    if (id) {
      get(`/order/${id}`)
        .then(response => setForm(response.data))
        .catch(error => console.error('Error fetching order:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      put(`/order/${editingId}`, form)
        .then(() => {
          setOrders(orders.map(order => (order._id === editingId ? form : order)));
          setForm({ productName: '', totalPrice: '', description: '' });
          setEditingId(null);
        })
        .catch(error => console.error('Error updating order:', error));
    } else {
      post('/order', form)
        .then(response => {
          setOrders([...orders, response.data]);
          setForm({ productName: '', totalPrice: '', description: '' });
        })
        .catch(error => console.error('Error creating order:', error));
    }
  };

  const handleEdit = (order) => {
    setForm(order);
    setEditingId(order._id);
  };

  const handleDelete = (id) => {
    del(`/order/${id}`)
      .then(() => setOrders(orders.filter(order => order._id !== id)))
      .catch(error => console.error('Error deleting order:', error));
  };

  return (
    <div>
      <h1>Orders</h1>
      <Form onSubmit={handleSubmit}>
        <Input label="Product Name" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} />
        <Input label="Total Price" value={form.totalPrice} onChange={(e) => setForm({ ...form, totalPrice: e.target.value })} type="number" />
        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
      </Form>
      <List 
        items={orders} 
        renderItem={(order) => (
          <div>
            {order.productName} (${order.totalPrice})
            <Button onClick={() => handleEdit(order)}>Edit</Button>
            <Button onClick={() => handleDelete(order._id)}>Delete</Button>
          </div>
        )}
      />
      <Link to="/">Back</Link>
    </div>
  );
};

export default OrderPage;
