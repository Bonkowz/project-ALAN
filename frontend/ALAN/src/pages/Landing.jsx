import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={() => handleNavigate('/signin')}>Sign In</button>
      <button onClick={() => handleNavigate('/signup')}>Sign Up</button>
    </div>
  );
};

export default Landing;
