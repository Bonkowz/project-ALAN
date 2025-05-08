import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleNavigate('/admin/userManagement')}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Go to User Management
        </button>
        <button
          onClick={() => handleNavigate('/admin/products')}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Go to Products
        </button>
        <button
          onClick={() => handleNavigate('/admin/orderFulfillment')}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Go to Order Fulfillment
        </button>
        <button
          onClick={() => handleNavigate('/admin/sales')}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Go to Sales
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
