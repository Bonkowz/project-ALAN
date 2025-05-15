import React from 'react';
import chickenBreastImg from "../assets/images/chicken_breast.jpg";
import '../index.css';

function SalesReportCard({ data, transactions = [] }) {
    const price = data.productPrice || 10;

    // Compute total units sold and revenue from transactions
    const totalUnitsSold = transactions.reduce((sum, t) => sum + (t.orderQty || 0), 0);
    const totalRevenue = totalUnitsSold * price;

    const productTypeLabel = data.productType === 1 ? 'Crop' : data.productType === 2 ? 'Poultry' : 'Unknown Type';

    return (
        <div
            id="salesReportCard"
            className="w-full bg-white rounded-[25px] overflow-hidden my-2 max-w-4xl mx-auto shadow-md"
        >
            <div className="flex items-center text-left px-4 py-2">
                <div className="w-1/2 flex items-center">
                    {/* Image */}
                    <div className="w-1/5 flex-shrink-0">
                        <img
                            src={chickenBreastImg}
                            alt="product"
                            className="w-16 h-16 object-cover rounded-[15px]"
                        />
                    </div>

                    {/* Text Info */}
                    <div className="w-4/5 pl-2">
                        <p className="text-lg font-serif">{data.productName}</p>
                        <p className="text-sm italic text-gray-600">{productTypeLabel}</p>
                        <p className="text-xs text-gray-500">{data.productDescription}</p>
                    </div>
                </div>
                
                <div className="w-1/2 flex justify-between pr-2">
                    <div className="w-1/3 text-center">
                        <p className="text-lg font-mono">₱{price.toFixed(2)}</p>
                    </div>
                    <div className="w-1/3 text-center">
                        <p className="text-lg font-mono">{totalUnitsSold}</p>
                    </div>
                    <div className="w-1/3 text-center">
                        <p className="text-lg font-mono">₱{totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesReportCard;
