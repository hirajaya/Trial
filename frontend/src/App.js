import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './components/ProductPage';
import ProfilePage from './components/ProfilePage';

// import Dashboard from './admin/Dashboard';

// import Settings from './admin/Settings';
import AdminPanel from './admin/AdminOutlet';
import ProductsPanel from './admin/ProductsPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/products" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<h1>Welcome to the App</h1>} />
          <Route path="/admin/*" element={<AdminPanel />}>
            {/* Nested routes for different panels */}
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
            <Route path="manage-products" element={<ProductsPanel />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
