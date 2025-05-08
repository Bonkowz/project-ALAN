import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div>
      <h1>Sign up Page</h1>
      <button onClick={() => handleNavigate('/products')}>Go to Products</button>
    </div>
  );
};

export default Signup;
