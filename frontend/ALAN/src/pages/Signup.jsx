import React from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming you have an icon/logo for Project ALAN, replace with actual path
// import projectAlanIcon from "../assets/images/project-alan-icon.png";

const Signup = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    // Use a similar background color and center the content as per the image
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FEFAE0] text-gray-800 px-4">
      {/* Container for the sign-up form - Adjusted styling to match image */}
      <div className="bg-white p-8 rounded-[25px] shadow-md w-full max-w-sm">
        {/* Project ALAN Logo/Icon and text - Styled to match the image */}
        <div className="flex items-center mb-6">
          {/* Icon placeholder - replace with your actual icon component or tag */}
          {/* This div mimics the icon's appearance */}
          <div className="w-8 h-8 bg-[#606C38] rounded-full mr-2 flex items-center justify-center text-[#FEFAE0] text-sm font-bold"> {/* Placeholder for icon */}
            {/* You could add an SVG or image here */}🌱
          </div>
          <p className="font-serif text-lg text-[#606C38]">Project <i>ALAN</i></p>
        </div>

        {/* Sign up heading and subtitle - Styled to match the image */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Sign up</h1>
        <p className="text-gray-600 mb-6">Create an account.</p>

        {/* Email Input with Icon - Styled to match the image */}
        <div className="mb-4 flex items-center border border-gray-300 rounded-md bg-gray-200 px-3">
            {/* Icon placeholder for email */}
            <span className="mr-2 text-gray-500">👤</span> {/* Placeholder icon */}
            <input
                type="email"
                placeholder="enter email"
                className="w-full py-2 bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
            />
        </div>

        {/* Password Input with Icon - Styled to match the image */}
        <div className="mb-6 flex items-center border border-gray-300 rounded-md bg-gray-200 px-3">
            {/* Icon placeholder for password */}
            <span className="mr-2 text-gray-500">🔒</span> {/* Placeholder icon */}
            <input
                type="password"
                placeholder="enter password"
                className="w-full py-2 bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
            />
        </div>

        {/* Sign Up Button - Styled to match the image */}
        <button
          className="w-full bg-[#BC6C25] text-[#FEFAE0] py-2 rounded-md hover:bg-[#d89d61] transition duration-200 font-bold text-lg"
          onClick={() => { /* Add signup logic here */ }}
        >
          Sign up
        </button>
      </div>

      {/* Existing navigation button - Kept as is and positioned below the main content */}
      <div className="mt-8">
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

export default Signup;