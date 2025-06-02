import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo_placeholder.png";
import signOutImg from "../assets/images/sign_out.png";
import axios from 'axios';

function DashboardHeader() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const logout = async () => {
        console.log("test");
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/logout`);
        handleNavigate('/signin');
        window.location.reload();
    }

    return (
        <div className="sticky top-0 w-full h-25 bg-[#606C38] flex items-center justify-between px-6 mb-12">
            <div className="flex items-center space-x-4">
                <button onClick={() => handleNavigate('/admin/dashboard')} id="logoButton">
                    <img src={logoImg} className="h-20" />
                </button>
                <span className="text-4xl font-serif text-[#FEFAE0]">| Dashboard</span>
            </div>

            {/* Sign Out */}
            <button className="w-20 h-10 rounded-[25px]" id="cartButton" onClick={logout}>
                <img src={signOutImg} className="h-10" />
            </button>
        </div>
    );
}

export default DashboardHeader;
