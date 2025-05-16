import React from 'react';
import '../index.css';

function SalesLabel() {
    return (
        <div
            id="salesLabel"
            className="w-full bg-white rounded-[25px] overflow-hidden my-4 max-w-4xl mx-auto shadow-md"
        >
            <div className="flex items-center text-left p-4 font-semibold text-gray-700">
                <div className="w-1/2">Product Sold</div>

                <div className="w-1/2 flex justify-between pr-2">
                    <div className="w-1/3 text-center">Unit Price</div>
                    <div className="w-1/3 text-center">Units Sold</div>
                    <div className="w-1/3 text-center">Total Sales</div>
                </div>
            </div>
        </div>
    );
}

export default SalesLabel;
