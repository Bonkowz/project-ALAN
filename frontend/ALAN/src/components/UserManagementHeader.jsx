import logoImg from "../assets/images/logo_placeholder.png";

function UserManagementHeader() {
    return (
        <div className="w-full h-25 bg-[#606C38] flex mb-12 justify-start items-center text-white px-6 py-4">
            <img src={logoImg} className="mr-4 h-20" />

            <span className="text-4xl font-serif my-1 text-[#FEFAE0]">| Manage Users</span>
        </div>
    );
}

export default UserManagementHeader;
