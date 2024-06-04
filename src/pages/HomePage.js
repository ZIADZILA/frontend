// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../App.module.css';

// Functional component definition for HomePage
const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <ul>
        <li><Link to="/user">User Service</Link></li>
        <li><Link to="/product">Product Service</Link></li>
        <li><Link to="/order">Order Service</Link></li>
        <li><Link to="/inventory">Inventory Service</Link></li>
      </ul>
    </div>
  );
};

export default HomePage;
