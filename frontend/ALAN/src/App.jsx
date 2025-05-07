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
      {/* <h1>Product List</h1>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.productName} ({p.productDescription}) - Qty: {p.productQty}
          </li>
        ))}
      </ul> */}
      <ProductListingUser></ProductListingUser>
    </div>
  );
}

export default App;
