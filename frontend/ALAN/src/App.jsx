import { useEffect, useState } from 'react';
import ProductListingUser from './components/ProductListingUser';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <ProductListingUser data={products}></ProductListingUser>
    </div>
  );
}

export default App;
