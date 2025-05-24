import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';

// TODO: reroute unauthorized to 401 page

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <div>Loading user data...</div>;
  }
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  if (allowedRoles && (!user.userType || !allowedRoles.includes(user.userType))) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
