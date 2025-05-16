import React from 'react'
import chickenBreastImg from "../assets/images/chicken_breast.jpg";

function CartCard({ data }) {
    return (
        <div className="flex items-center justify-evenly h-40 m-4 p-4 bg-white rounded-[25px]">
            <div className="flex items-center w-1/4 pr-4">
                <input type="checkbox" className="size-5 mr-2" />
                <img src={chickenBreastImg} className="h-32 rounded-[10px]" />

                <div className="ml-3">
                    <p className="font-serif text-left"> {data.productName} </p>
                    <p className="font-serif text-left"> {data.productType == 1 ? "crop" : "poultry"} </p>
                    <p className="font-serif text-left"> {data.productDescription} </p>
                </div>
            </div>

            <p className="font-serif w-1/6"> PHP {data.productPrice} </p>
            <p className="font-serif w-1/6"> {data.productQty} pcs </p>
            <p className="font-serif text-[#BC6C25] w-1/6"> PHP {data.productPrice * data.productQty} </p>

            <button className="w-1/8 bg-[#BC6C25] text-[#FEFAE0] rounded-[25px]">
                DELETE
            </button>
        </div>
    )
}

export default CartCard