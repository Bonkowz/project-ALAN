import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div>
      <h1>Admin Products</h1>
      <button onClick={() => handleNavigate('/admin/dashboard')}>Go to Dashboard</button>
    </div>
  );
};

export default AdminProducts;
