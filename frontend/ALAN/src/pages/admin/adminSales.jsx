import React, { useEffect, useState } from 'react';
import SalesReportCard from '../../components/SalesReportCard';
import SalesHeader from '../../components/SalesHeader';
import SalesLabel from '../../components/SalesLabel';
import TotalSalesBar from '../../components/TotalSalesBar';

function AdminSales() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Promise.all([
      fetch('http://localhost:5000/products/get-all-products').then(res => res.json()),
      fetch('http://localhost:5000/transaction/get-all-transactions').then(res => res.json())
    ])
      .then(([productsData, transactionsData]) => {
        setProducts(productsData);
        setTransactions(transactionsData.filter(tx => tx.orderStatus === 1));
      })
      .catch(err => console.error("Error fetching data:", err));
  };

  // 🔢 Calculate total revenue
  const totalRevenue = transactions.reduce((sum, tx) => {
    const product = products.find(p => p._id === tx.productId);
    const price = product?.productPrice || 0;
    return sum + price * (tx.orderQty || 0);
  }, 0);


  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      <SalesHeader />

      <div className="flex flex-wrap gap-4 justify-center items-center p-4">
        <SalesLabel />
        {products.map(product => {
          const productTransactions = transactions.filter(tx => tx.productId === product._id);
          return (
            <SalesReportCard
              key={product._id}
              data={product}
              transactions={productTransactions}
            />
          );
        })}
        <TotalSalesBar totalRevenue={totalRevenue} />
      </div>
    </div>
  );
}

export default AdminSales;
