import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-8">Landing Page</h1>
      <div className="flex gap-4">
        <button
          onClick={() => handleNavigate('/signin')}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Sign In
        </button>
        <button
          onClick={() => handleNavigate('/signup')}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
