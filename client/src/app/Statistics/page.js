'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function StatisticsPage() {
   const [orders, setOrders] = useState([]);
   const type = useSearchParams().get('type');

   const [products, setProducts] = useState([
      {
         name: 'Bạc xỉu',
         quantity: 5,
      },
      {
         name: 'Nâu',
         quantity: 5,
      },
      {
         name: 'Đen',
         quantity: 5,
      },
   ]);

   const convertDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear().toString().slice(-2); // Lấy 2 chữ số cuối của năm
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Thêm 1 vì getMonth() trả về giá trị từ 0-11
      const day = date.getDate().toString().padStart(2, '0'); // Thêm '0' nếu ngày có 1 chữ số
      return `${year}/${month}/${day}`;
   };

   const convertToTime = (isoString) => {
      const date = new Date(isoString);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
   };

   const currentDate = new Date();
   let start, end;

   if (type === 'month') {
      start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
   } else {
      start = new Date(currentDate);
      end = new Date(currentDate);
      end.setDate(start.getDate() + 1);    
   }

   const [startDate, setStartDate] = useState(start.toISOString().split('T')[0]); // Định dạng YYYY-MM-DD
   const [endDate, setEndDate] = useState(end.toISOString().split('T')[0]); // Định dạng YYYY-MM-DD

   const handleDateChange = (e) => {
      const isoDate = e.target.value;
      setStartDate(isoDate);
      const date = new Date(isoDate);
      date.setDate(date.getDate() + 1);
      const nextDate = date.toISOString().split('T')[0];
      setEndDate(nextDate);
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order/statics`,
               {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     startDate,
                     endDate,
                  }),
               }
            );
            const response2 = await fetch(
               `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/statistics/monthly`,
               {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     startDate,
                     endDate,
                  }),
               }
            );
            const data = await response.json();
            const data2 = await response2.json();
            setProducts(data2.items);
            setOrders(data.orders);
         } catch (error) {
            console.error('Error fetching orders:', error);
         }
      };

      fetchData();
   }, [startDate, endDate]);

   const getTotalStats = () => {
      let totalAmount = 0;
      let totalOrders = 0;

      orders.forEach((order) => {
         totalAmount += order.total_amount;
         totalOrders += 1;
      });

      return { totalAmount, totalOrders };
   };

   const totalStats = getTotalStats();

   return (
      <div className='container mx-auto p-6 bg-white text-black'>
         {type === 'month' ? (
            <div>
               <h1 className='text-2xl font-bold mb-4'>Thống Kê Theo Tháng</h1>
               <div className='mb-4'>
                  <label className='block mb-2'>
                     <div>Ngày bắt đầu:</div>
                     <input
                        type='date'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className='ml-2 p-2 border border-gray-300 rounded'
                     />
                  </label>
                  <label className='block mb-2'>
                     <div>Ngày kết thúc:</div>
                     <input
                        type='date'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className='ml-2 p-2 border border-gray-300 rounded'
                     />
                  </label>
               </div>
               <table className='min-w-full bg-white border border-gray-200 rounded-md shadow-md'>
                  <thead>
                     <tr>
                        <th className='py-2 px-4 border-b'>STT</th>
                        <th className='py-2 px-4 border-b'>Ngày bán</th>
                        <th className='py-2 px-4 border-b'>
                           Tổng tiền của đơn
                        </th>
                     </tr>
                  </thead>
                  {orders.map((order, index) => (
                     <tbody key={index}>
                        <tr>
                           <th className='py-2 px-4 font-mono'>{index + 1}</th>
                           <th className='py-2 px-4 font-mono'>
                              {convertDate(order.orderDate)}
                           </th>
                           <th className='py-2 px-4 font-mono'>
                              {order.total_amount}
                           </th>
                        </tr>
                     </tbody>
                  ))}
                  <tbody>
                     <tr>
                        <td className='py-2 px-4 border-b'></td>
                        <td className='py-2 px-4 border-b'>
                           Tổng số đơn: {totalStats.totalOrders}
                        </td>
                        <td className='py-2 px-4 border-b'>
                           <span className='mr-1'>Tổng doanh thu:</span>
                           {totalStats.totalAmount.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                           })}
                        </td>
                     </tr>
                  </tbody>
               </table>
               <div className='text-2xl font-bold mt-9 mb-9'>
                  Chi tiết số sản phẩm đã bán:
               </div>
               <table className='min-w-full bg-white border border-gray-200 rounded-md shadow-md'>
                  <thead>
                     <tr>
                        <th className='py-2 px-4 border-b'>STT</th>
                        <th className='py-2 px-4 border-b'>Tên món</th>
                        <th className='py-2 px-4 border-b'>Số lượng đã bán</th>
                     </tr>
                  </thead>
                  {products.map((product, index) => (
                     <tbody key={index}>
                        <tr>
                           <th className='py-2 px-4 font-mono'>{index + 1}</th>
                           <th className='py-2 px-4 font-mono'>{product.name}</th>
                           <th className='py-2 px-4 font-mono'>{product.quantity}</th>
                        </tr>
                     </tbody>
                  ))}
               </table>
            </div>
         ) : (
            <div>
               <h1 className='text-2xl font-bold mb-4'>Thống Kê Theo Ngày</h1>
               <div className='mb-4'>
                  <label className='block mb-2'>
                     Ngày bắt đầu:
                     <input
                        type='date'
                        value={startDate}
                        onChange={handleDateChange}
                        className='ml-2 p-2 border border-gray-300 rounded'
                     />
                  </label>
               </div>
               <table className='min-w-full bg-white border border-gray-200 rounded-md shadow-md'>
                  <thead>
                     <tr>
                        <th className='py-2 px-4 border-b'>STT</th>
                        <th className='py-2 px-4 border-b'>
                           Thời gian lên đơn
                        </th>
                        <th className='py-2 px-4 border-b'>
                           Tổng tiền của đơn
                        </th>
                        <th className='py-2 px-4 border-b'>
                           Trạng thái của đơn
                        </th>
                     </tr>
                  </thead>
                  {orders.map((order, index) => (
                     <tbody key={index}>
                        <tr>
                           <th className='py-2 px-4 font-mono'>{index + 1}</th>
                           <th className='py-2 px-4 font-mono'>
                              {convertToTime(order.orderDate)}
                           </th>
                           <th className='py-2 px-4 font-mono'>
                              {order.total_amount}
                           </th>
                           <th className='py-2 px-4 font-mono'>{order.status}</th>
                        </tr>
                     </tbody>
                  ))}
                  <tbody>
                     <tr>
                        <td className='py-2 px-4 border-b'></td>
                        <td className='py-2 px-4 border-b'>
                           Tổng số đơn: {totalStats.totalOrders}
                        </td>
                        <td className='py-2 px-4 border-b'>
                           <span className='mr-1'>Tổng doanh thu:</span>
                           {totalStats.totalAmount.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                           })}
                        </td>
                        <td className='py-2 px-4 border-b'></td>
                     </tr>
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
}

export default StatisticsPage;
