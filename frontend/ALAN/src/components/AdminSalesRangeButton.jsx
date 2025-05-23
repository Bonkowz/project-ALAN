// components/AdminSalesRangeButton.jsx
import React from 'react';

const AdminSalesRangeButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-6 rounded-2xl font-semibold shadow border transition-colors
        ${active ? 'bg-[#606C38] text-white border-[#BC6C25]' : 'bg-white text-gray-800 border-yellow-400 hover:bg-yellow-100'}
      `}
    >
      {label}
    </button>
  );
};

export default AdminSalesRangeButton;
