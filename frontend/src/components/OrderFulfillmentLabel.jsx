import '../index.css';

function OrderFulfillmentLabel() {
    return (
        <div
            id="orderFulfillmentLabel"
            className="w-full bg-white rounded-[25px] overflow-hidden my-4 max-w-6xl mx-auto shadow-md"
        >
            <div className="flex items-center text-left p-4 font-semibold text-gray-700">
                <div className="w-5/12">Products Ordered</div>
                <div className="w-1/6">Date Ordered</div> 
                <div className="w-1/8">Price</div>
                <div className="w-1/8">Qty</div>
                <div className="w-1/6">Total</div>
                <div className="w-1/6 text-right">Confirmation</div>
            </div>
        </div>
    );
}


export default OrderFulfillmentLabel;
