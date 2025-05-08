import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => handleNavigate('/admin/userManagement')}>Go to User Management</button>
      <button onClick={() => handleNavigate('/admin/products')}>Go to Products</button>
      <button onClick={() => handleNavigate('/admin/orderFulfillment')}>Go to Order Fulfillment</button>
      <button onClick={() => handleNavigate('/admin/sales')}>Go to Sales</button>
    </div>
  );
};

export default AdminDashboard;
