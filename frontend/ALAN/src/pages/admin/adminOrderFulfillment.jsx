import React, { useEffect, useState } from 'react';
import OrderFulfillmentCard from '../../components/OrderFulfillmentCard';
import OrderFulfillmentHeader from '../../components/OrderFulfillmentHeader';
import OrderFulfillmentLabel from '../../components/OrderFulfillmentLabel';

function AdminOrderFulfillment() {
  const [mergedOrders, setMergedOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/transaction/get-filtered-transactions-merged?orderStatus=0')
      .then(res => res.json())
      .then(data => {
        setMergedOrders(data);
      })

      .catch(err => console.error("Error fetching merged orders:", err));

  };

  const handleConfirm = async (transactionId, productId, orderQty, currentStock) => {
    // Check if requested quantity exceeds stock
    if (orderQty > currentStock) {
      alert("Error: Ordered quantity exceeds current stock.");
      return;
    }

    try {
      console.log('Updating transaction:', transactionId);

      // 1. Update transaction status
      await fetch(`http://localhost:5000/transaction/update-transaction/${transactionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderStatus: 1 }),
      });

      // 2. Update product stock
      const updatedStock = currentStock - orderQty;
      await fetch(`http://localhost:5000/product/update-product/${productId}`, {
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
      alert("An error occurred while confirming the order. Please try again.");
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
