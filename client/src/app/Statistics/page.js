'use client'

import { useState, useEffect } from 'react';

const Statistics = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState('2024-07-01'); // Điều chỉnh theo nhu cầu
  const [endDate, setEndDate] = useState('2024-07-31'); // Điều chỉnh theo nhu cầu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order/statics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate,
            endDate,
          }),
        });
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const getMonthlyStats = () => {
    const stats = {};
    orders.forEach(order => {
      const date = new Date(order.orderDate);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      
      if (!stats[monthYear]) {
        stats[monthYear] = { totalAmount: 0, orderCount: 0 };
      }
      
      stats[monthYear].totalAmount += order.total_amount;
      stats[monthYear].orderCount += 1;
    });
    
    return stats;
  };

  const monthlyStats = getMonthlyStats();

  return (
    <div className="container mx-auto p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Thống Kê Theo Tháng</h1>
      
      {/* Form chọn ngày */}
      <div className="mb-4">
        <label className="block mb-2">
          Ngày bắt đầu:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="ml-2 p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Ngày kết thúc:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="ml-2 p-2 border border-gray-300 rounded"
          />
        </label>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Tháng</th>
            <th className="py-2 px-4 border-b">Số Đơn</th>
            <th className="py-2 px-4 border-b">Tổng Doanh Thu</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(monthlyStats).map(([monthYear, stats]) => (
            <tr key={monthYear}>
              <td className="py-2 px-4 border-b">{monthYear}</td>
              <td className="py-2 px-4 border-b">{stats.orderCount}</td>
              <td className="py-2 px-4 border-b">{stats.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;

