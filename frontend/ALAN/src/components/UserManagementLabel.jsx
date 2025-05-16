import '../index.css';

function UserManagementLabel() {
  return (
    <div
      id="userManagementLabel"
      className="w-full bg-white rounded-[25px] overflow-hidden my-4 max-w-4xl mx-auto shadow-md"
    >
      <div className="flex items-center text-left px-6 py-4 font-semibold text-gray-700">
        <div className="w-1/4 text-center flex justify-center">
          <div className="w-4 h-4 bg-[#606C38] rounded-full"></div>
        </div>
        
        <div className="w-2/4 text-center">Email</div> 
        <div className="w-1/4 text-center">Total Spent</div>
      </div>
    </div>
  );
}

export default UserManagementLabel;
