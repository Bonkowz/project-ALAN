import { useEffect, useState } from 'react';
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

  console.log(mergedOrders)
  const handleConfirm = async (transactionId, productId, orderQty, currentStock) => {
    // Check if requested quantity exceeds stock
    if (orderQty > currentStock) {
      alert("Error: Ordered quantity exceeds current stock.");
      return;
    }

    try {
      console.log('Updating transaction:', transactionId);
      // 1. Update transaction status
      await fetch('http://localhost:5000/transaction/update-transaction', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: transactionId, orderStatus: 1 }),
      });


      // 2. Update product stock
      const updatedStock = currentStock - orderQty;
      await fetch(`http://localhost:5000/product/update-product`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId, productQty: updatedStock }),
      });

      // 3. Remove confirmed order from view
      fetchData();

    } catch (err) {
      console.error("Error confirming order:", err);
    }
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      <OrderFulfillmentHeader />
      <div className="flex flex-wrap gap-4 justify-center items-center p-4">
        <OrderFulfillmentLabel />

        {mergedOrders.length === 0 ? (
          <p className="text-center w-full text-gray-600 italic mt-4">
            No orders awaiting fulfillment.
          </p>
        ) : (
          mergedOrders.map((order) => (
            <OrderFulfillmentCard
              key={order._id}
              data={order}
              onConfirm={() =>
                handleConfirm(order._id, order.productId, order.orderQty, order.productQty)
              }
            />
          ))
        )}
      </div>
    </div>
  );

}

export default AdminOrderFulfillment;
