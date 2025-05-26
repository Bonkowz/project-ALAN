import { useNavigate } from 'react-router-dom';
import landingImg from "../assets/images/landing.png";
import logoImg from "../assets/images/logo_placeholder.png";

// TODO: furnish design of page

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen flex flex-col items-center justify-center p-0 text-center">
      <div className="w-full max-w-[1600px] mx-auto mt-8 mb-8 px-0">
        <div className="flex justify-between items-center w-full mb-8 px-12">
          <p className="font-serif text-6xl font-bold text-[#38471C]">
            Project <i>ALAN</i>
          </p>
          <div>
            <button className="font-serif w-32 h-14 text-2xl bg-[#606C38] text-[#FEFAE0] rounded-[25px] mr-6"
              onClick={() => handleNavigate('/signin')}>log in</button>
            <button className="font-serif w-32 h-14 text-2xl bg-[#BC6C25] text-[#FEFAE0] rounded-[25px]"
              onClick={() => handleNavigate('/signup')}>sign up</button>
          </div>
        </div>
        <div className="relative w-full aspect-[2.3/1] rounded-[40px] overflow-hidden">
          <img
            src={landingImg}
            className="w-full h-full object-cover rounded-[40px] border-none"
            alt="Landing"
          />
          <div className="absolute right-16 top-1/3 w-[32vw] max-w-[500px] text-right">
            <p className="font-serif italic text-4xl text-[#38471C] leading-snug">
              Bringing quality, from the<br />farm to your table.
            </p>
          </div>
          <div className="absolute right-16 bottom-8 flex flex-col items-end">
            <img
              src={logoImg}
              alt="Logo"
              className="w-24 h-24 object-contain mb-1"
            />
          </div>
        </div>
        <p className="font-serif text-2xl mt-8">© COPYRIGHT 2025</p>
      </div>
    </div>
  );
};

export default Landing;