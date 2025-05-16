import React from 'react';
import { useNavigate } from 'react-router-dom';
import landingImg from "../assets/images/landing.png";

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-[#FEFAE0] p-4">
      <div className="flex justify-between items-center w-[90%] max-w-4xl mx-auto">
        <p className="font-serif text-2xl shadow-2xl"> Project <i>ALAN</i></p>

        <div>
          <button className="w-20 h-10 bg-[#606C38] text-[#FEFAE0] rounded-[25px] m-1"
            onClick={() => handleNavigate('/admin/dashboard')}> admin </button>
          <button className="w-20 h-10 bg-[#BC6C25] text-[#FEFAE0] rounded-[25px] m-1"
            onClick={() => handleNavigate('/products')}> user </button>
        </div>
      </div>

      <center>
        <img src={landingImg} className="rounded-[25px] w-[90%] max-w-4xl mx-auto object-cover" />
      </center>

      <p className="font-serif"> © COPYRIGHT 2025 </p>
    </div>
  );
};

export default Landing;