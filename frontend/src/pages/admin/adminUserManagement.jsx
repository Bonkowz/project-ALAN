import React, { useEffect, useState } from 'react';
import UserManagementCard from '../../components/UserManagementCard';
import UserManagementHeader from '../../components/UserManagementHeader';
import UserManagementLabel from '../../components/UserManagementLabel';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/user/get-customer-transactions')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
    console.log(users);
  }, []);

  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      <UserManagementHeader />
      <div className="flex flex-col justify-start px-6 pt-1 pb-3 gap-1 max-w-5xl mx-auto">

        <h2 className="text-2xl text-left font-bold text-[#283618] mb-1">List of Active Users</h2>
        <UserManagementLabel />

        {/* User cards */}
        <div className="flex flex-col divide-y divide-gray-200">
          {users.map(user => (
            <UserManagementCard key={user._id} data={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminUserManagement;
