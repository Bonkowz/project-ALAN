import React from 'react';
import '../index.css';

function OrderFulfillmentCard({ data, onConfirm }) {
    const price = data.orderProductPrice;
    const quantity = data.orderQty;
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
                
                {/* Image & Product Info */}
                <div className="w-[22%] flex items-center gap-2">
                    <img
                        src={data.productImg}
                        alt="product"
                        className="w-16 h-16 object-cover rounded-[15px]"
                    />
                    <div>
                        <p className="text-sm font-serif">{data.productName}</p>
                        <p className="text-xs italic text-gray-600">{productTypeLabel}</p>
                        <p className="text-xs text-gray-500">Stock: {data.productQty}</p>
                    </div>
                </div>

                {/* Email */}
                <div className="w-[20%]">
                    <p className="text-sm font-mono break-words">{data.email}</p>
                </div>

                {/* Date Ordered */}
                <div className="w-[13%]">
                    <p className="text-sm font-mono">{data.dateOrdered}</p>
                </div>

                {/* Unit Price */}
                <div className="w-[10%]">
                    <p className="text-sm font-mono">₱{price.toFixed(2)}</p>
                </div>

                {/* Quantity */}
                <div className="w-[10%]">
                    <p className="text-sm font-mono">{quantity}</p>
                </div>

                {/* Total */}
                <div className="w-[13%]">
                    <p className="text-sm font-mono">₱{total.toFixed(2)}</p>
                </div>

                {/* Confirm Button */}
                <div className="w-[12%] text-right">
                    <button
                        id="confirmButton"
                        className="bg-[#606C38] rounded-[25px] text-white text-xs w-24 font-mono p-2"
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
