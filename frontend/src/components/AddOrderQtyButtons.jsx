import React from 'react'

function AddOrderQtyButtons({ data, increaseOrder, decreaseOrder }) {
    return (
        <div>
            {/* minus box */}
            <button className="w-10 h-10 bg-[#606C38] text-[#FEFAE0] rounded-[5px]"
                onClick={() => increaseOrder()}>
                -
            </button>

            {/* qty box */}
            <div className="w-10 h-10 text-[#FEFAE0] rounded-[5px]">
                {data.orderQty}
            </div>

            {/* plus box */}
            <button className="w-10 h-10 bg-[#606C38] text-[#FEFAE0] rounded-[5px]"
                onClick={() => decreaseOrder()}>
                +
            </button>
        </div>
    )
}

export default AddCartQty