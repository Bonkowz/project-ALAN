import logoImg from "../assets/images/logo_placeholder.png";

function OrderFulfillmentHeader() {
    return (
        <div className="w-full h-25 bg-[#606C38] flex mb-12 justify-start items-center text-white px-6 py-4">
            <img src={logoImg} className="h-16 mr-4" alt="Logo" />
            <span className="text-xl font-semibold">| Manage Orders</span>
        </div>
    );
}

export default OrderFulfillmentHeader;
