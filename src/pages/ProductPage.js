// src/pages/ProductPage.js

import React, { useEffect, useState } from 'react';
import { get, post, put, del } from '../services/api';
import { useParams, Link } from 'react-router-dom'; // Removed useNavigate
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import List from '../components/List';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    get('/product')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    if (id) {
      get(`/product/${id}`)
        .then(response => setForm(response.data))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      put(`/product/${editingId}`, form)
        .then(() => {
          setProducts(products.map(product => (product._id === editingId ? form : product)));
          setForm({ name: '', price: '', description: '' });
          setEditingId(null);
        })
        .catch(error => console.error('Error updating product:', error));
    } else {
      post('/product', form)
        .then(response => {
          setProducts([...products, response.data]);
          setForm({ name: '', price: '', description: '' });
        })
        .catch(error => console.error('Error creating product:', error));
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = (id) => {
    del(`/product/${id}`)
      .then(() => setProducts(products.filter(product => product._id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h1>Products</h1>
      <Form onSubmit={handleSubmit}>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} type="number" />
        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
      </Form>
      <List 
        items={products} 
        renderItem={(product) => (
          <div>
            {product.name} (${product.price})
            <Button onClick={() => handleEdit(product)}>Edit</Button>
            <Button onClick={() => handleDelete(product._id)}>Delete</Button>
          </div>
        )}
      />
      <Link to="/">Back</Link>
    </div>
  );
};

export default ProductPage;
