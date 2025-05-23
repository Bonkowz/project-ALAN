import React, { useEffect, useState } from 'react';
import AdminProductCard from '../../components/AdminProductCard';
import AdminProductHeader from '../../components/AdminProductHeader';
import AdminProductDropDown from '../../components/AdminProductDropDown';
import AdminProductsEdit from '../../components/AdminProductsEdit';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [updatedQty, setUpdatedQty] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [sortChoice, setSortChoice] = useState('productName');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, [sortChoice, sortOrder]);

  // Fetch products with the current sorting configuration
  const fetchProducts = () => {
    const endpoint = `http://localhost:5000/products/get-all-products-sorted?sortBy=${sortChoice}&order=${sortOrder}`;

    fetch(endpoint)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setUpdatedQty(product.productQty);
    setUpdatedPrice(product.productPrice);
    setisEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setisEditModalOpen(false);
  };

  const handleSave = async () => {
    try {
      await fetch('http://localhost:5000/product/update-product', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedProduct._id,
          productQty: updatedQty,
          productPrice: updatedPrice
        }),
      });

      closeModal();
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div>
      <AdminProductHeader />
      <div className="flex justify-end px-6 mt-2">
        <AdminProductDropDown
          selected={sortChoice}
          onSelect={setSortChoice}
          sortOrder={sortOrder}
          onToggleOrder={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
        />
      </div>


      <div className="flex flex-wrap gap-4 justify-center items-center mt-4">
        {products.map((product) => (
          <AdminProductCard
            key={product._id}
            data={product}
            onEdit={() => openModal(product)}
          />
        ))}
      </div>

      {isEditModalOpen && (
        <AdminProductsEdit
          product={selectedProduct}
          updatedQty={updatedQty}
          updatedPrice={updatedPrice}
          onQtyChange={setUpdatedQty}
          onPriceChange={setUpdatedPrice}
          onCancel={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default AdminProducts;
