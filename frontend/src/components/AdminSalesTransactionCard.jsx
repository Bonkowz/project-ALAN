import chickenBreastImg from "../assets/images/chicken_breast.jpg";
import '../index.css';

function AdminSalesTransactionCard({ data }) {
    const price = data.orderProductPrice;
    const quantity = data.orderQty;
    const total = price * quantity;
    const productTypeLabel = data.productType === 1 ? 'Crop' : data.productType === 2 ? 'Poultry' : 'Unknown Type';

    return (
        <div
            id="adminSalesTransactionCard"
            className="w-full bg-white rounded-[25px] overflow-hidden my-2 max-w-6xl mx-auto shadow-md"
        >
            <div className="flex items-center text-left px-4 py-3">
                {/* Image */}
                <div className="w-[10%] flex-shrink-0">
                    <img
                        src={chickenBreastImg}
                        alt="product"
                        className="w-16 h-16 object-cover rounded-[15px]"
                    />
                </div>

                {/* Product Name, Type, and Description */}
                <div className="w-[26%] pr-2 pl-2">
                    <p className="text-base font-serif">{data.productName}</p>
                    <p className="text-sm italic text-gray-600 leading-tight">{productTypeLabel}</p>
                    <p className="text-xs text-gray-500 leading-tight">{data.productDescription}</p>
                </div>

                {/* Email */}
                <div className="w-[16%] ml-[-8px]">
                    <p className="text-sm font-mono whitespace-nowrap">{data.email}</p>
                </div>

                {/* Date Ordered */}
                <div className="w-[15%] pl-4">
                    <p className="text-sm font-mono">{data.dateOrdered}</p>
                </div>


                {/* Unit Price */}
                <div className="w-[16%]">
                    <p className="text-sm font-mono">₱{price.toFixed(2)}</p>
                </div>

                {/* Quantity Ordered */}
                <div className="w-[10%]">
                    <p className="text-sm font-mono">{quantity}</p>
                </div>

                {/* Total */}
                <div className="w-[15%] text-right">
                    <p className="text-sm font-mono">₱{total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminSalesTransactionCard;
