// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Final Project</h1>
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