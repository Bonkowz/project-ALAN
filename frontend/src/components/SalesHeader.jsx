import logoImg from "../assets/images/logo_placeholder.png";

function SalesHeader() {
    return (
        <div className="w-full h-25 bg-[#606C38] flex mb-12 justify-start items-center pl-6 space-x-4">
            <img src={logoImg} className="h-20" />
            <span className="text-4xl font-serif my-1 text-[#FEFAE0]">| Sales Report</span>
        </div>
    );
}

export default SalesHeader;
