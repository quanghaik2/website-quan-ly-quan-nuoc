'use client';
import FormDelete from '@/components/formDelete';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [idOrder, setIdOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order`);
      if (response.status !== 200) {
        toast.error('Lấy đơn thất bại');
        return;
      }
      const data = await response.json();
      setOrders(data.orders); 
    } catch (error) {
      toast.error('Error fetching orders:', error);
    }
  };



  const handleCloseFormData = () => {
    setShowFormDelete(false);
  };

  const handleDeleteSuccess = () => {
    setShowFormDelete(false);
    // Load lại trang hoặc fetch lại dữ liệu
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 mt-10 relative">
      {showFormDelete && (
        <div className="absolute inset-0">
          <FormDelete 
          onClose={handleCloseFormData} 
          id={idorder} 
          endpoint={'api/order/delete'} 
          type='order' 
          onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      )}
      <div className='text-black'>
        <table className='min-w-full table-auto'>
          <thead className='mb-10'>
            <tr className='bg-white mb-10'>
              <th className='px-4 py-2 text-center'>STT</th>
              <th className='px-4 py-2 text-center'>Tên bàn</th>
              <th className='px-4 py-2 text-center'>Trạng thái</th>
              <th className='px-4 py-2 text-center'>Tiền hóa đơn</th>
              <th className='px-4 py-2 text-center'></th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id} className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                  <td className='px-4 py-2 text-center'>{index + 1}</td>
                  <td className='px-4 py-2 text-center'>
                    {order.tableId.tableName}
                  </td>
                  <td className='px-4 py-2 text-center'>{order.status}</td>
                  <td className='px-4 py-2 text-center'>{order.total_amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='px-4 py-2 text-center'>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
