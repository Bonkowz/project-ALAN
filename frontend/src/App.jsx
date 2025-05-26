// import { useEffect, useState } from 'react';
// import UserProducts from './components/UserProducts';

// function App() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/products')
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, []);

//   return (
//     <div>
//       <UserProducts data={products}></UserProducts>

import AppRoutes from './routes/AppRoutes';
import './App.css';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster position='top-center' toastOptions={{ duration: 2000 }} />
      <AppRoutes />
    </div>
  )
};

export default App; 