import React from 'react'
import logoImg from "../assets/images/logo_placeholder.png";
import cartImg from '../assets/images/shopping_cart.png'

function Header() {
    return (
        <div className="w-full h-25 bg-[#DDA15E] flex mb-12 justify-evenly items-center">
            <img src={logoImg} className="mx-5 h-20" />
            <input
                type="search"
                className="bg-white w-[75%] h-[50%] p-3 pl-10 rounded-lg"
                placeholder="Search..."
            />
            <img src={cartImg} className="mx-5 h-10" />
        </div>

    )
}

export default Header