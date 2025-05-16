import React, { useEffect, useState } from 'react';
import OrderFulfillmentCard from '../../components/OrderFulfillmentCard';
import OrderFulfillmentHeader from '../../components/OrderFulfillmentHeader';
import OrderFulfillmentLabel from '../../components/OrderFulfillmentLabel';

function AdminOrderFulfillment() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [mergedOrders, setMergedOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Promise.all([
      fetch('http://localhost:5000/transactions/get-all-transactions').then(res => res.json()),
      fetch('http://localhost:5000/products/get-all-products').then(res => res.json())
    ])
      .then(([transactions, products]) => {
        setOrders(transactions);
        setProducts(products);

        const pendingOrders = transactions.filter(order => order.orderStatus === 0);

        const combined = pendingOrders.map(order => {
          // Find product by _id (assuming product._id)
          const product = products.find(p => p._id === order.productId);
          return {
            ...order,
            productName: product?.productName || 'Unknown Product',
            productType: product?.productType || 'No description',
            productQty: product?.productQty || 0,
            price: product?.productPrice || 0,
            productId: product?._id // keep productId updated with actual _id
          };
        });

        setMergedOrders(combined);
      })
      .catch(err => console.error("Error fetching data:", err));
  };

  const handleConfirm = async (transactionId, productId, orderQty, currentStock) => {
    try {
      console.log('Updating transaction:', transactionId);
      // 1. Update transaction status
      await fetch(`http://localhost:5000/transactions/update-transaction/${transactionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderStatus: 1 }),
      });

      // 2. Update product stock
      const updatedStock = currentStock - orderQty;
      await fetch(`http://localhost:5000/products/update-product/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productQty: updatedStock }),
      });

      // 3. Remove confirmed order from view
      setMergedOrders(prev => prev.filter(order => order._id !== transactionId));
    } catch (err) {
      console.error("Error confirming order:", err);
    }
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      <OrderFulfillmentHeader />
      <div className="flex flex-wrap gap-4 justify-center items-center p-4">
        <OrderFulfillmentLabel />
        {mergedOrders.map((order) => (
          <OrderFulfillmentCard
            key={order._id}
            data={order}
            onConfirm={() =>
              handleConfirm(order._id, order.productId, order.orderQty, order.productQty)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default AdminOrderFulfillment;
