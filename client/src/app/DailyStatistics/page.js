'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DailyStatisticsPage = () => {
    const currentDate = new Date();
    const start = new Date(currentDate);
    const end = new Date(currentDate);
    end.setDate(start.getDate() + 1);
  
    const [startDate, setStartDate] = useState(start.toISOString().split('T')[0]); // Định dạng YYYY-MM-DD
    const [endDate, setEndDate] = useState(end.toISOString().split('T')[0]);
  const [statistics, setStatistics] = useState(null);
  const router = useRouter();

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/statistics/daily`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setStatistics(data);
      } else {
        toast.error(data.message || 'Có lỗi xảy ra khi lấy thống kê');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatistics();
  };

  return (
    <main className="min-h-screen w-full bg-white text-black pb-10">
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Thống kê theo ngày</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
            Lấy thống kê
          </button>
        </form>

        {statistics && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Thống kê từ {startDate} đến {endDate}</h2>

            <h3 className="text-lg font-bold mb-2">Bảng nhập nguyên liệu</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Tên nguyên liệu</th>
                  <th className="px-4 py-2 border border-gray-300">Số lượng nhập</th>
                </tr>
              </thead>
              <tbody>
                {statistics.ingredients.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">{item.ingredient.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-lg font-bold mt-4 mb-2">Bảng xuất nguyên liệu</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Tên sản phẩm</th>
                  <th className="px-4 py-2 border border-gray-300">Số lượng xuất</th>
                </tr>
              </thead>
              <tbody>
                {statistics.stats.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-lg font-bold mt-4 mb-2">Bảng doanh thu</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Tổng doanh thu</th>
                  <th className="px-4 py-2 border border-gray-300">Tổng chi phí</th>
                  <th className="px-4 py-2 border border-gray-300">Lợi nhuận</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-300">{statistics.stats.income}</td>
                  <td className="px-4 py-2 border border-gray-300">{statistics.stats.cost}</td>
                  <td className="px-4 py-2 border border-gray-300">{statistics.stats.profit}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-bold mt-4 mb-2">Bảng số món đã bán</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Tên món</th>
                  <th className="px-4 py-2 border border-gray-300">Số lượng đã bán</th>
                </tr>
              </thead>
              <tbody>
                {statistics.stats.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

// const DailyStatisticsPage = () => (
//   <Suspense fallback={<div>Loading...</div>}>
//     <DailyStatistics />
//   </Suspense>
// );

export default DailyStatisticsPage;
