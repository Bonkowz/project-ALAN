import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProducts = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div>
      <h1>User Product Listings</h1>
      <button onClick={() => handleNavigate('/orders')}>Go to Orders</button>
    </div>
  );
};

export default UserProducts;
