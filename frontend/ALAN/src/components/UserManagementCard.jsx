import personImg from "../assets/images/person_606C38.png";
import '../index.css';

function UserManagementCard({ data }) {
  const { email, totalSpent } = data;

  return (
    <div
      id="userManagementList"
      className="w-full bg-white rounded-[25px] overflow-hidden my-2 max-w-4xl mx-auto shadow-md"
    >
      <div className="flex items-center text-left px-6 py-4">
        {/* Avatar */}
        <div className="w-1/4 text-center">
          <img
            src={personImg}
            alt="person"
            className="w-14 h-14 object-cover inline-block"
          />
        </div>

        {/* Email */}
        <div className="w-2/4 text-center">
          <p className="text-lg font-mono">{email}</p>
        </div>

        {/* Total Spent */}
        <div className="w-1/4 text-center">
          <p className="text-lg font-mono">₱{(totalSpent || 0).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default UserManagementCard;
