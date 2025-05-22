import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <div>Loading user data...</div>;
  }
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  if (allowedRoles && (!user.userType || !allowedRoles.includes(user.userType))) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
