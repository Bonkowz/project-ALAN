import logoImg from "../assets/images/logo_placeholder.png";

function AdminProductHeader() {
    return (
        <div className="w-full h-25 bg-[#606C38] flex mb-12 justify-start items-center pl-6 space-x-4">
            <img src={logoImg} className="h-20" />
            <span className="text-xl font-semibold text-white">| Product Listings</span>
        </div>
    );
}

export default AdminProductHeader;
