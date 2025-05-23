import React from 'react'
import '../index.css';

function ProductCard({ data, addToCart }) {
    return (
        <div id="productCard" className="w-[400px] bg-[#FEFAE0] rounded-b-[25px] overflow-hidden m-4">
            <img src={data.productImg} className="w-full h-70 object-cover rounded-none" />
            <div className="p-4">
                <p className="text-4xl font-serif my-1 text-left font-bold"> {data.productName} </p>

                <div className="flex justify-between items-center px-2">
                    <p className="text-2xl font-serif my-1"> {data.productType == 1 ? "crop" : "poultry"} </p>
                    <p className="text-2xl font-serif my-1"> {data.productDescription} </p>
                </div>

                <div className="flex justify-between items-center px-2">
                    <p className="text-2xl font-serif italic"> {data.productQty} in stock </p>
                    <p className="text-2xl font-serif font-bold"> ₱ {data.productPrice} </p>
                </div>
                <button className="bg-[#606C38] rounded-[25px] text-white text-1xl w-full font-mono p-2 my-1" id="addToCartButton"
                    onClick={() => addToCart(data._id)}>
                    ADD TO CART
                </button>
            </div>
        </div>
    )
}

export default ProductCard