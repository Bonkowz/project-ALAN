import chickenBreastImg from "../assets/images/chicken_breast.jpg";
import '../index.css';

function AdminProductCard({ data, onEdit }) {
    return (
        <div
            id="adminProductCard"
            className="w-[220px] bg-[#FEFAE0] rounded-b-[16px] overflow-hidden m-2 shadow-sm"
        >
            <img src={chickenBreastImg} className="w-full h-[120px] object-cover" />
            <div className="p-2">
                <p className="text-lg font-serif font-bold mb-1 truncate">{data.productName}</p>

                <div className="flex justify-between items-center text-xs mb-1">
                    <p>{data.productType === 1 ? "Crop" : "Poultry"}</p>
                    <p className="truncate max-w-[100px]">{data.productDescription}</p>
                </div>

                <div className="flex justify-between items-center text-xs font-medium mb-1">
                    <p className="italic">{data.productQty} in stock</p>
                    <p className="font-bold">₱{data.productPrice}</p>
                </div>
                <button 
                    className="bg-[#BC6C25] rounded-[25px] text-white text-sm w-full font-mono py-1"
                    onClick={onEdit}
                >
                    EDIT
                </button>
            </div>
        </div>
    );
}

export default AdminProductCard;
