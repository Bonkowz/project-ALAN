// components/AdminSalesRangeButton.jsx
const AdminSalesRangeButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-6 rounded-2xl font-semibold shadow border transition-colors
        ${active ? 'bg-[#BC6C25] text-white border-[#606C38]' : 'bg-white text-gray-800 border-yellow-400 hover:bg-yellow-100'}
      `}
    >
      {label}
    </button>
  );
};

export default AdminSalesRangeButton;
