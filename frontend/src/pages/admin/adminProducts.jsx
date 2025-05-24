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

  const fetchProducts = () => {
    const endpoint = `http://localhost:5000/product/get-all-products-sorted?sortBy=${sortChoice}&order=${sortOrder}`;

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
    <div className="bg-[#FEFAE0] min-h-screen flex flex-col">
      <AdminProductHeader />
      <div className="flex justify-end px-6 mt-2 max-w-6xl mx-auto w-full">
        <AdminProductDropDown
          selected={sortChoice}
          onSelect={setSortChoice}
          sortOrder={sortOrder}
          onToggleOrder={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
        />
      </div>

      <div className="productSection flex-grow max-h-[60vh] overflow-y-auto p-4 flex flex-wrap gap-4 justify-center items-center max-w-6xl mx-auto mt-4">
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
