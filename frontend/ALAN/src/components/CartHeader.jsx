import React from 'react'
import { useNavigate } from 'react-router-dom';
import logoImg from "../assets/images/logo_placeholder.png";

function CartHeader({ data }) {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="w-full h-25 bg-[#DDA15E] flex mb-12 items-center">
            <div className="flex items-center">
                <button onClick={() => handleNavigate('/products')} id="cartButton">
                    <img src={logoImg} className="mx-5 h-20" />
                </button>
                <p className="text-4xl font-serif my-1 text-[#FEFAE0]">| {data} </p>
            </div>
        </div>
    )
}

export default CartHeader