import '../index.css';

function AdminSalesTransactionLabel() {
    return (
        <div
            id="adminSalesTransactionLabel"
            className="w-full bg-white rounded-[25px] overflow-hidden my-4 max-w-6xl mx-auto shadow-md"
        >
            <div className="flex items-center text-left px-4 py-3 font-semibold text-gray-700">
                <div className="w-[10%]"></div> {/* For image space */}
                <div className="w-[28%] pr-4">Products Ordered</div>
                <div className="w-[15%]">Email</div>
                <div className="w-[15%]">Date Ordered</div>
                <div className="w-[16%]">Price</div>
                <div className="w-[10%]">Qty</div>
                <div className="w-[15%] text-right">Total</div>
            </div>
        </div>
    );
}

export default AdminSalesTransactionLabel;
