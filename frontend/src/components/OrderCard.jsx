function OrderCard({ data, cancelOrder }) {
    var toDisplay;
    switch (data.orderStatus) {
        case 0:
            toDisplay = <>
                <p className="font-serif text-center text-[#BC6C25]"> Pending <br /> Confirmation </p>
                <button className="w-26 h-8 bg-[#BC6C25] text-[#FEFAE0] rounded-[25px]" id="addToCartButton"
                    onClick={() => cancelOrder(data._id)}>
                    CANCEL
                </button>
            </>
            break;
        case 1:
            toDisplay = <>
                <p className="font-serif text-center text-[#606C38]"> Confirmed by <br /> Merchant </p>
            </>
            break;
        case 2:
            toDisplay = <>
                <p className="font-serif text-center text-[#BC6C25]"> Cancelled </p>
            </>
            break; r
    }

    return (
        <div className="flex items-center justify-evenly h-40 m-4 p-4 bg-white rounded-[25px]">
            <div className="flex items-center w-1/4 pr-4">
                <img src={data.productImg} className="w-50 h-32 object-cover rounded-[10px]" />
                <div className="ml-3">
                    <p className="font-serif text-left"> {data.productName} </p>
                    <p className="font-serif text-left"> {data.productType == 1 ? "crop" : "poultry"} </p>
                    <p className="font-serif text-left"> {data.productDescription} </p>
                </div>
            </div>

            <p className="font-serif w-1/6"> ₱ {data.productPrice} </p>
            <p className="font-serif w-1/6"> {data.orderQty} {data.orderQty == 1 ? "pc" : "pcs"} </p>
            <p className="font-serif text-[#BC6C25] w-1/6"> ₱ {data.productPrice * data.orderQty} </p>

            <div className="flex flex-col items-center">
                {toDisplay}
            </div>
        </div>
    )
}

export default OrderCard