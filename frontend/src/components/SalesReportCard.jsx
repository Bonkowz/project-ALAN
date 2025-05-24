import React from 'react';
import '../index.css';

function SalesReportCard({ data, transactions = [] }) {
    // Compute total units sold and total revenue from individual transaction prices
    const totalUnitsSold = transactions.reduce((sum, t) => sum + (t.orderQty || 0), 0);
    const totalRevenue = transactions.reduce((sum, t) => sum + ((t.orderProductPrice || 0) * (t.orderQty || 0)), 0);

    const productTypeLabel = data.productType === 1 ? 'Crop' : data.productType === 2 ? 'Poultry' : 'Unknown Type';

    return (
        <div
            id="salesReportCard"
            className="w-full bg-white rounded-[25px] overflow-hidden my-2 max-w-4xl mx-auto shadow-md"
        >
            <div className="flex items-center text-left px-4 py-2">
                <div className="w-2/3 flex items-center">
                    {/* Image */}
                    <div className="w-1/5 flex-shrink-0">
                        <img
                            src={data.productImg}
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

                {/* Metrics */}
                <div className="w-1/3 flex justify-evenly pr-2">
                    <div className="text-center">
                        <p className="text-lg font-mono">{totalUnitsSold}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-mono">₱{totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesReportCard;
