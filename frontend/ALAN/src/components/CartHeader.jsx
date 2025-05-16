import React from 'react'
import { useNavigate } from 'react-router-dom';
import logoImg from "../assets/images/logo_placeholder.png";
import cartImg from '../assets/images/shopping_cart.png'

function CartHeader() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="w-full h-25 bg-[#DDA15E] flex mb-12 items-center">
            <div className="flex items-center">
                <img src={logoImg} className="mx-5 h-20" />
                <p className="text-4xl font-serif my-1 text-[#FEFAE0]">| Shopping Cart </p>
            </div>
        </div>
    )
}

export default CartHeader