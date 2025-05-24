import React, { useEffect, useState } from 'react';
import SalesReportCard from '../../components/SalesReportCard';
import SalesHeader from '../../components/SalesHeader';
import SalesLabel from '../../components/SalesLabel';
import AdminSalesTransactionLabel from '../../components/AdminSalesTransactionLabel';
import TotalSalesBar from '../../components/TotalSalesBar';
import AdminSalesRangeButton from '../../components/AdminSalesRangeButton';
import AdminSalesViewButton from '../../components/AdminSalesViewButton';
import AdminSalesTransactionCard from '../../components/AdminSalesTransactionCard';


function AdminSales() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeRange, setActiveRange] = useState('All');
  const [activeView, setActiveView] = useState('Products'); // New state

  useEffect(() => {
    fetchData();
  }, [activeRange]);


  const fetchData = () => {


    // Use different transaction route based on activeRange
    const transactionsUrl =
      activeRange === 'All'
        ? `http://localhost:5000/transaction/get-filtered-transactions-merged?orderStatus=1`
        : `http://localhost:5000/transaction/get-filtered-transactions-merged-date?orderStatus=1&range=${activeRange}`;

    Promise.all([
      fetch(`http://localhost:5000/product/get-all-products`).then(res => res.json()),
      fetch(transactionsUrl).then(res => res.json())
    ])
      .then(([productsData, transactionsData]) => {
        setProducts(productsData);
        setTransactions(transactionsData);
      })
      .catch(err => console.error("Error fetching data:", err));
    console.log(transactions);

  };


  const handleRangeClick = (range) => {
    setActiveRange(range);
    console.log(`Range selected: ${range}`);
  };

  const handleViewClick = (view) => {
    setActiveView(view);
    console.log(`View selected: ${view}`);

  };

  const totalRevenue = transactions.reduce((sum, tx) => {
    return sum + (tx.orderProductPrice || 0) * (tx.orderQty || 0);
  }, 0);

  return (
    <div className="bg-[#FEFAE0] min-h-screen flex flex-col">
      <SalesHeader />


      <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4 pt-4 mb-2">

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700 mb-1">View:</span>
          <div className="flex gap-4">
            {['Products', 'Transactions'].map(view => (
              <AdminSalesViewButton
                key={view}
                label={view}
                active={activeView === view}
                onClick={() => handleViewClick(view)}
              />
            ))}
          </div>
        </div>

 
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-700 mb-1">Date Range:</span>
          <div className="flex gap-4">
            {['All', 'Weekly', 'Monthly', 'Annual'].map(range => (
              <AdminSalesRangeButton
                key={range}
                label={range}
                active={activeRange === range}
                onClick={() => handleRangeClick(range)}
              />
            ))}
          </div>
        </div>
      </div>


      <div className="salesSection flex-grow max-h-[60vh] overflow-y-auto p-4 flex flex-wrap gap-4 justify-center items-start max-w-6xl mx-auto">

        {activeView === 'Products' ? <SalesLabel /> : <AdminSalesTransactionLabel />}

        {activeView === 'Products' && products.map(product => {
          const productTransactions = transactions.filter(tx => tx.productId === product._id);
          return (
            <SalesReportCard
              key={product._id}
              data={product}
              transactions={productTransactions}
            />
          );
        })}

        {activeView === 'Transactions' && transactions.map(tx => (
          <AdminSalesTransactionCard key={tx._id} data={tx} />
        ))}
      </div>

      <TotalSalesBar totalRevenue={totalRevenue} />
    </div>


  );

}

export default AdminSales;
