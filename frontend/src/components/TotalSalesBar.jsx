import '../index.css';

function TotalSalesBar({ totalRevenue }) {
    return (
        <div
            id="totalSalesBar"
            className="w-full bg-white rounded-[25px] overflow-hidden my-4 max-w-6xl mx-auto shadow-md sticky bottom-0 z-10"
        >
            <div className="flex flex-col items-end p-4 font-semibold text-gray-700">
                <div className="text-right text-lg">Total Revenue</div>
                <div className="text-right text-xl font-mono text-[#BC6C25]">PHP {totalRevenue.toFixed(2)}</div>
            </div>
        </div>
    );
}

export default TotalSalesBar;
