import logoImg from "../assets/images/logo_placeholder.png";

function UserManagementHeader() {
    return (
        <div className="w-full h-25 bg-[#606C38] flex mb-12 justify-evenly items-center text-white">
            <img src={logoImg} className="mx-5 h-20" />

            <span className="text-xl font-semibold mx-2">| Manage Users</span>

            <input
                type="search"
                className="bg-white w-[75%] h-[50%] p-3 pl-10 rounded-lg text-black"
                placeholder="Search..."
            />
        </div>
    );
}

export default UserManagementHeader;
