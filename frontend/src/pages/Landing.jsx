import { useNavigate } from 'react-router-dom';
import landingImg from "../assets/images/landing.png";

// TODO: furnish design of page

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center w-full mb-8 px-8">
          <p className="font-serif text-4xl shadow-2xl"> Project <i>ALAN</i></p>
          <div>
            <button className="font-serif w-24 h-12 text-lg bg-[#606C38] text-[#FEFAE0] rounded-[25px] m-2"
              onClick={() => handleNavigate('/signin')}> login </button>
            <button className="font-serif w-24 h-12 text-lg bg-[#BC6C25] text-[#FEFAE0] rounded-[25px] m-2"
              onClick={() => handleNavigate('/signup')}> signup </button>
          </div>
        </div>
        <img
          src={landingImg}
          className="rounded-[35px] w-full max-w-6xl h-[500px] object-cover shadow-xl mb-6"
          alt="Landing"
        />
        <p className="font-serif text-lg mt-4"> © COPYRIGHT 2025 </p>
      </div>
    </div>
  );
};

export default Landing;