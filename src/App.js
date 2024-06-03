// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import InventoryPage from './pages/InventoryPage';
import HomePage from './pages/HomePage'; // Import the HomePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
