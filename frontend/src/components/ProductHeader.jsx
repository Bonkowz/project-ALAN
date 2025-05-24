import { useNavigate } from 'react-router-dom';
import logoImg from "../assets/images/logo_placeholder.png";
import cartImg from '../assets/images/shopping_cart.png'
import menuImg from '../assets/images/menu.png'

function ProductHeader() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="w-full h-25 bg-[#DDA15E] flex mb-12 justify-evenly items-center">
            <img src={logoImg} className="mx-5 h-20" />
            <input
                type="search"
                className="bg-white w-[75%] h-[50%] p-3 pl-10 rounded-lg"
                placeholder="Search..."
            />
            <button onClick={() => handleNavigate('/cart')} id="cartButton">
                <img src={cartImg} className="mx-5 h-10" />
            </button>

            <button onClick={() => handleNavigate('/orders')} id="cartButton">
                <img src={menuImg} className="mx-5 h-10" />
            </button>
        </div>
    )
}

export default ProductHeader