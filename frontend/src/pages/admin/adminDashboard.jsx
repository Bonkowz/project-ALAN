import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import circleStarImg from "../../assets/images/circlestar.png";
import noteImg from "../../assets/images/note.png";
import personImg from "../../assets/images/person.png";
import calendarImg from "../../assets/images/calendar.png";
import { UserContext } from '../../context/userContext';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const {user} = useContext(UserContext);

  return (
    <div className="bg-white min-h-screen">
      <DashboardHeader />

      {/* Greeting */}
      <div className="text-left ml-4 mt-4">
        <p className="text-4xl font-bold text-black">Hello, Admin {user.firstName}</p>
        <p className="text-lg font-semibold text-black">Have a Good Day!</p>
      </div>

      {/* Main Flex Layout */}
      <div className="max-w-6xl mx-auto mt-10 flex gap-4 p-4 h-[60vh]">

        {/* Left Section */}
        <div className="flex flex-col w-1/2 gap-4">

          {/* Order Fulfillment */}
          <div
            className="relative flex-1 bg-[#BC6C25] rounded-[25px] shadow-md cursor-pointer hover:bg-[#d89d61] transition"
            onClick={() => handleNavigate('/admin/orderFulfillment')}
          >
            <div className="absolute top-2 right-4">
              <p className="text-lg font-semibold text-[#FEFAE0]">Order Fulfillment</p>
            </div>

            <img
              src={circleStarImg}
              className="absolute bottom-2 left-4 w-18 h-18 rounded-full object-cover"
            />
          </div>

          {/* Bottom Row */}
          <div className="flex gap-4 h-1/2">

            {/* Manage Users */}
            <div
              className="relative flex-1 bg-[#DDA15E] rounded-[25px] shadow-md cursor-pointer hover:bg-[#eeb66d] transition"
              onClick={() => handleNavigate('/admin/userManagement')}
            >
              <div className="absolute top-2 right-4">
                <p className="text-md font-semibold text-[#FEFAE0]">Manage Users</p>
              </div>

              <img
                src={personImg}
                className="absolute bottom-2 left-4 w-18 h-18 object-cover"
              />
            </div>

            {/* Sales Reports */}
            <div
              className="relative flex-1 bg-[#606C38] rounded-[25px] shadow-md cursor-pointer hover:bg-[#7a8646] transition"
              onClick={() => handleNavigate('/admin/sales')}
            >
              <div className="absolute top-2 right-4">
                <p className="text-md font-semibold text-[#FEFAE0]">Sales Reports</p>
              </div>

              <img
                src={calendarImg}
                className="absolute bottom-2 left-4 w-18 h-18 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="relative w-1/2 bg-[#FEFAE0] rounded-[25px] shadow-md cursor-pointer hover:bg-[#fdf2c0] transition"
          onClick={() => handleNavigate('/admin/products')}
        >
          <div className="absolute top-2 right-4">
            <p className="text-2xl font-bold text-[#606C38]">Product Listing</p>
          </div>

          <img
            src={noteImg}
            className="absolute bottom-2 left-4 w-24 h-24 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
