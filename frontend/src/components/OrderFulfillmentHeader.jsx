import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo_placeholder.png";

function OrderFulfillmentHeader() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="sticky top-0 w-full h-25 bg-[#606C38] flex mb-12 justify-start items-center pl-6 space-x-4">
            <button onClick={() => handleNavigate('/admin/dashboard')} id="logoButton">
                <img src={logoImg} className="mx-5 h-20" />
            </button>
            <span className="text-4xl font-serif my-1 text-[#FEFAE0]">| Manage Orders</span>
        </div>
    );
}

export default OrderFulfillmentHeader;
