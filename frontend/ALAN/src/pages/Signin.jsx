import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={() => handleNavigate('/admin/dashboard')}>Go to Dashboard</button>
      <button onClick={() => handleNavigate('/products')}>Go to Products</button>
    </div>
  );
};

export default Signin;
