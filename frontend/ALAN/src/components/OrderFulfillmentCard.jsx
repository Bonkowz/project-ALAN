import React from 'react';
import chickenBreastImg from "../assets/images/chicken_breast.jpg";
import '../index.css';

function OrderFulfillmentCard({ data, onConfirm }) {
    const price = data.orderProductPrice || 10;
    const quantity = data.orderQty || 1;
    const total = price * quantity;
    const productTypeLabel = data.productType === 1 ? 'Crop' : data.productType === 2 ? 'Poultry' : 'Unknown Type';

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(data._id);
        }
    };

    return (
        <div
            id="orderFulfillmentCard"
            className="w-full bg-white rounded-[25px] overflow-hidden my-2 max-w-6xl mx-auto shadow-md"
        >
            <div className="flex items-center text-left px-4 py-2">
                {/* Image */}
                <div className="w-[10%] flex-shrink-0">
                    <img
                        src={chickenBreastImg}
                        alt="product"
                        className="w-16 h-16 object-cover rounded-[15px]"
                    />
                </div>

                {/* Product Name, Description, and Stock */}
                <div className="w-[28%] pr-4">
                    <p className="text-lg font-serif">{data.productName}</p>
                    <p className="text-sm italic text-gray-600">{productTypeLabel}</p>
                    <p className="text-xs text-gray-500">Stock: {data.productQty}</p>
                </div>

                {/* Date Ordered */}
                <div className="w-[15%]">
                    <p className="text-lg font-mono">{data.dateOrdered}</p>
                </div>

                {/* Unit Price */}
                <div className="w-[16%]">
                    <p className="text-lg font-mono">₱{price.toFixed(2)}</p>
                </div>

                {/* Quantity Ordered */}
                <div className="w-[10%]">
                    <p className="text-lg font-mono">{quantity}</p>
                </div>

                {/* Total */}
                <div className="w-[15%]">
                    <p className="text-lg font-mono">₱{total.toFixed(2)}</p>
                </div>

                {/* Confirm Button */}
                <div className="w-[20%] text-right">
                    <button
                        className="bg-[#606C38] rounded-[25px] text-white text-sm w-28 font-mono p-2"
                        onClick={handleConfirm}
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        </div>
    );
}


export default OrderFulfillmentCard;
