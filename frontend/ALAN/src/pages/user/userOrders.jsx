import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div>
      <h1>User Orders</h1>
      <button onClick={() => handleNavigate('/products')}>Go to Products</button>
    </div>
  );
};

export default UserOrders;
