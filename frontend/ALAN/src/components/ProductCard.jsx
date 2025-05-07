import React from 'react'
import chickenBreastImg from "../assets/images/chicken_breast.jpg";
import '../index.css';

function ProductCard({ data }) {
    return (
        <div id="productCard" className="w-[400px] bg-[#FEFAE0] rounded-b-[25px] overflow-hidden m-4">
            <img src={chickenBreastImg} className="w-full rounded-none" />
            <div className="p-4">
                <p className="text-4xl font-serif my-1">Chicken Breast</p>
                <p className="text-2xl font-serif italic">poultry</p>
                <p className="text-2xl font-serif italic">100 pcs in stock</p>
                <button className="bg-[#606C38] rounded-[25px] text-white text-1xl w-full font-mono p-2 my-1">
                    ADD TO CART
                </button>
            </div>
        </div>
    )
}

export default ProductCard