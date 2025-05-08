import { useEffect, useState } from 'react';
import UserProducts from './components/UserProducts';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <UserProducts data={products}></UserProducts>
    </div>
  );
}

export default App;
