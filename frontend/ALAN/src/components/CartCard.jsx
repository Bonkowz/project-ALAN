import React, { useState, useEffect } from 'react';
import AddOrderQtyButton from './AddOrderQtyButtons';

function CartCard({ data, isSelected, onToggleSelect, deleteItem, increaseOrder, decreaseOrder }) {
    return (
        <div className="flex items-center justify-evenly h-40 m-4 p-4 bg-white rounded-[25px]">
            <div className="flex items-center w-1/4 pr-4">
                <input type="checkbox" className="size-5 mr-2" checked={isSelected} onChange={onToggleSelect} />
                <img src={data.productImg} className="h-32 rounded-[10px]" />

                <div className="ml-3">
                    <p className="font-serif text-left"> {data.productName} </p>
                    <p className="font-serif text-left"> {data.productType == 1 ? "crop" : "poultry"} </p>
                    <p className="font-serif text-left"> {data.productDescription} </p>
                </div>
            </div>

            <p className="font-serif w-1/7"> ₱ {data.productPrice} </p>
            <AddOrderQtyButton
                orderQty={data.orderQty}
                increaseOrder={() => increaseOrder(data._id)}
                decreaseOrder={() => decreaseOrder(data._id)}
            />
            <p className="font-serif text-[#BC6C25] w-1/10"> ₱ {data.productPrice * data.orderQty} </p>

            <button className="w-1/8 h-8 bg-[#BC6C25] text-[#FEFAE0] rounded-[25px]" id="addToCartButton"
                onClick={() => { deleteItem(data._id) }}>
                DELETE
            </button>
        </div>
    )
}

export default CartCard