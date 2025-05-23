import React, { useState, useEffect } from 'react';
import CartHeader from '../../components/CartHeader';
import OrderCard from '../../components/OrderCard';

const UserOrders = () => {
  const [orderItems, setOrderITems] = useState([]);

  useEffect(() => {
    async function fetchAllOrders() {
      try {
        const [pendingRes, canceledRes, completedRes] = await Promise.all([
          fetch('http://localhost:5000/transaction/get-all-transactions-pending'),
          fetch('http://localhost:5000/transaction/get-all-transactions-cancelled'),
          fetch('http://localhost:5000/transaction/get-all-transactions-completed'),
        ]);

        const [pending, cancelled, completed] = await Promise.all([
          pendingRes.json(),
          canceledRes.json(),
          completedRes.json(),
        ]);

        const allOrders = [...pending, ...cancelled, ...completed];
        setOrderITems(allOrders);

      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    }

    fetchAllOrders();
  }, []);

  async function cancelOrder(id) {
    try {
      const response = await fetch('http://localhost:5000/transaction/update-transaction', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, orderStatus: 2 }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        setOrderITems(prevItems =>
          prevItems.map(item =>
            item._id === id ? { ...item, orderStatus: 2 } : item
          )
        );
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      <CartHeader data="Manage Orders" />

      <div className="flex items-center justify-evenly text-center h-18 m-4 p-4 bg-white rounded-[25px]">
        <p className="font-serif w-1/6"> Product </p>
        <p className="font-serif w-1/6"> Price </p>
        <p className="font-serif w-1/6"> Qty </p>
        <p className="font-serif w-1/6"> Total Price </p>
        <p className="font-serif w-1/6"> Order Status </p>
      </div>

      <div>
        {orderItems.map((cartItem) => (
          <OrderCard key={cartItem._id} data={cartItem} cancelOrder={cancelOrder} />
        ))}
      </div>

      <br />

    </div>
  );
};

export default UserOrders;
