import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from '../context/userContext';
import ProtectedRoute from './ProtectedRoute'; 

// Import public pages
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Unauthorized from '../pages/Unauthorized';

// Import user pages
import UserProducts from '../pages/user/userProducts';
import UserOrders from '../pages/user/userOrders';
import UserCart from '../pages/user/userCart'

// Import admin pages
import AdminDashboard from '../pages/admin/adminDashboard';
import AdminUserManagement from '../pages/admin/adminUserManagement';
import AdminProducts from '../pages/admin/adminProducts';
import AdminOrderFulfillment from '../pages/admin/adminOrderFulfillment';
import AdminSales from '../pages/admin/adminSales';
import Landing from '../pages/Landing';


const AppRoutes = () => {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
           {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

          {/* User routes */}
          <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
            <Route path="/products" element={<UserProducts />} />
            <Route path="/cart" element={<UserCart />} />
            <Route path="/orders" element={<UserOrders />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={['administrator']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/userManagement" element={<AdminUserManagement />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orderFulfillment" element={<AdminOrderFulfillment />} />
            <Route path="/admin/sales" element={<AdminSales />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )

};

export default AppRoutes;
