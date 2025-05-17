import React from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming you have an image for the sign-in page header, replace with actual path
// import signInHeaderImg from "../assets/images/signin-header.png";

const Signin = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    // Use a similar background color and center the content
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FEFAE0] text-gray-800 px-4">
      {/* Container for the sign-in form */}
      <div className="bg-white p-8 rounded-[25px] shadow-md w-full max-w-sm">
        {/* Image placeholder - replace with your actual image component or tag */}
        {/* If using an image file: <img src={signInHeaderImg} alt="Project ALAN" className="rounded-[25px] w-full object-cover mb-6"/> */}
        {/* Placeholder div with background color and rounded corners */}
        <div className="bg-[#DDA15E] h-32 rounded-[25px] mb-6 flex items-center justify-center">
            {/* You can add text or an icon here if needed */}
             <p className="text-[#FEFAE0] text-2xl font-serif">Project <i>ALAN</i></p>
        </div>


        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#606C38] bg-gray-200"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#606C38] bg-gray-200"
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-[#606C38] text-[#FEFAE0] py-2 rounded-md hover:bg-[#7a8646] transition duration-200"
          onClick={() => { /* Add login logic here */ }}
        >
          log in
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account yet?{' '}
          <span
            className="text-[#BC6C25] hover:underline cursor-pointer"
            onClick={() => handleNavigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>

      {/* Existing navigation buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => handleNavigate('/admin/dashboard')}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => handleNavigate('/products')}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Go to Products
        </button>
      </div>
    </div>
  );
};

export default Signin;