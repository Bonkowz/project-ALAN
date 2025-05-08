
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

import React from 'react'; 
import AppRoutes from './routes/AppRoutes'; 
import './App.css';

const App = () => {
  return(
    <div> 
      <AppRoutes /> 
    </div>
  )
}; 

export default App; 