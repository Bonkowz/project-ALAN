import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo_placeholder.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardHeader() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const logout = async (event) => {
        console.log("test");
        await axios.post('http://localhost:5000/auth/logout');
        handleNavigate('/signin');
        window.location.reload();
    }

    return (
        <div className="sticky top-0 w-full h-25 bg-[#606C38] flex mb-12 justify-start items-center pl-6 space-x-4">
            <button onClick={() => handleNavigate('/admin/dashboard')} id="logoButton">
                <img src={logoImg} className="mx-5 h-20" />
            </button>
            <span className="text-4xl font-serif my-1 text-[#FEFAE0]">| Dashboard</span>
            <button className="w-20 h-10 bg-[#BC6C25] text-[#FEFAE0] rounded-[25px] m-1"
                onClick={() => logout()}> logout </button>
        </div>
    );
}

export default DashboardHeader;
