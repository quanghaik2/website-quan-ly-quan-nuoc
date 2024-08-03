'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import util from '@/utils/index';

const TableLayout = ({ tableStatus, searchQuery }) => {
  const [tables, setTables] = useState([]);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const {startDate, endDate} = util.getDateNow();

  const fetchTables = async () => {
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/table`);
      const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order/statics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });
      if (response.status !== 200) {
        toast.error('Lấy bàn thất bại');
        return;
      }
      if (response2.status !== 200) {
        toast.error('đã có lỗi xẩy ra'+ startDate + "" + endDate);
        return;
      }
      const data = await response.json();
      const data2 = await response2.json();
      let listTable = data.table;
      setOrders(data2.orders)
      // Lọc bàn dựa trên trạng thái

      listTable = listTable.map(table => {
        const isOccupied = orders.some(order => order.tableId._id === table._id);
        return { ...table, status: isOccupied };
      });


      if (tableStatus === 'empty') {
        listTable = listTable.filter(table => table.status === false);
      } else if (tableStatus === 'serving') {
        listTable = listTable.filter(table => table.status === true);
      }

      // Lọc bàn dựa trên truy vấn tìm kiếm
      if (searchQuery) {
        listTable = listTable.filter(table => table.tableName.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      setTables(listTable);
    } catch (error) {
      toast.error('Error fetching tables:', error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [tableStatus, searchQuery]); // Gọi fetchTables khi tableStatus hoặc searchQuery thay đổi


  const handleTableClick = (tableId, tableName) => {
    router.push(`/CreateOrder?tableId=${tableId}&tableName=${tableName}`);
  };

  const handleGetToEditOrder = async(tableId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order/orderOfTable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tableId, startDate, endDate}),
      });
      if (response.status !== 200) {
        toast.error('Lấy bàn thất bại');
        return;
      }
      const data = await response.json();
      const idOrder = data.orders._id;
      router.push(`/UpdateOrder?orderId=${idOrder}`)
    } catch (error) {
      toast.error('Error fetching tables:', error);
    }
  }

  return (
    <div className='p-4 bg-white h-dvh text-black'>
      <div className='grid grid-cols-6 gap-4'>
        {tables.map((table) => (
          <div
            key={table._id}
            className={`p-4 border rounded ${
              util.checkIdTable(table._id, orders) === false ? 'bg-green-100' : 'bg-red-100'
            } cursor-pointer`}
            onClick={util.checkIdTable(table._id, orders) === false ? () => handleTableClick(table._id, table.tableName) : () => handleGetToEditOrder(table._id)}
          >
            {table.tableName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLayout;
