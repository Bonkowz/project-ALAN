import { useEffect, useState } from 'react';
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
  const [activeView, setActiveView] = useState('Products'); // ⬅️ New state

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
    <div className="bg-[#FEFAE0] min-h-screen">
      <SalesHeader />

      {/* View Toggle Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        {['Products', 'Transactions'].map(view => (
          <AdminSalesViewButton
            key={view}
            label={view}
            active={activeView === view}
            onClick={() => handleViewClick(view)}
          />
        ))}
      </div>

      {/* Date Range Buttons */}
      <div className="flex justify-center gap-4 py-4">
        {['All', 'Weekly', 'Monthly', 'Annual'].map(range => (
          <AdminSalesRangeButton
            key={range}
            label={range}
            active={activeRange === range}
            onClick={() => handleRangeClick(range)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-center items-center p-4">
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


        <TotalSalesBar totalRevenue={totalRevenue} />
      </div>

    </div>
  );
}

export default AdminSales;
