function AddOrderQtyButton({ orderQty, increaseOrder, decreaseOrder }) {
    return (
        <div className="flex items-center w-1/5">
            {/* minus button */}
            <button
                className="w-10 h-10 bg-[#606C38] text-[#FEFAE0] rounded-tl-[5px] rounded-bl-[5px] flex items-center justify-center text-xl"
                onClick={decreaseOrder}
                id="addToCartButton"
            >
                -
            </button>

            {/* qty box */}
            <div className="w-10 h-10 border flex items-center justify-center font-serif">
                {orderQty}
            </div>

            {/* plus button */}
            <button
                className="w-10 h-10 bg-[#606C38] text-[#FEFAE0] rounded-tr-[5px] rounded-br-[5px] flex items-center justify-center text-xl"
                onClick={increaseOrder}
                id="addToCartButton"
            >
                +
            </button>
        </div>
    );
}

export default AddOrderQtyButton;
