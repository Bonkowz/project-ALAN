import React, { useState, useEffect } from 'react';
import CartHeader from '../../components/CartHeader';
import OrderCard from '../../components/OrderCard';

const UserOrders = () => {
  const [orderItems, setOrderITems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/transaction/get-all-transactions-pending')
      .then(res => res.json())
      .then(data => setOrderITems(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

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
          <OrderCard key={cartItem._id} data={cartItem} />
        ))}
      </div>

      <br />

    </div>
  );
};

export default UserOrders;
