import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-8">Sign Up Page</h1>
      <button
        onClick={() => handleNavigate('/products')}
        className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
      >
        Go to Products
      </button>
    </div>
  );
};

export default Signup;
