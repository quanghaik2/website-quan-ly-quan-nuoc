'use client';
import FormDelete from '@/components/formDelete';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaArrowRight } from "react-icons/fa";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [idOrder, setIdOrder] = useState(null);
  const [status, setStatus] = useState('');

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

  const handleShowFormDelete = (id) => {
    setIdOrder(id);
    setShowFormDelete(true); 
  };

  const handleUpdateStatus = async(status, orderId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order/update/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: status === "đã lên đơn" ? 'chờ thanh toán': status === 'chờ thanh toán' ? 'hoàn thành' : 'hoàn thành',
        }),
      });

      if (response.status  === 200) {
        fetchOrders();
      } else {
        toast.error(data.message || 'Cập nhật đơn hàng thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
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
          id={idOrder} 
          endpoint={'api/order'} 
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
              <th className='px-4 py-2 text-center'></th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id} className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                  <td className='px-4 py-2 text-center'>{index + 1}</td>
                  <td className='px-4 py-2 text-center'>
                    {order.tableName}
                  </td>
                  <td className='px-4 py-2 text-center'>
                    <button 
                    className={`w-36 py-2 rounded-lg text-white ${order.status === 'đã lên đơn' ? 'bg-blue-300' : order.status === 'chờ thanh toán' ? 'bg-red-300' : 'bg-green-300'}`}
                    onClick={() => handleUpdateStatus(order.status, order._id)}>{order.status}</button>
                  </td>
                  <td className='px-4 py-2 text-center'>{order.total_amount}</td>
                  <td>
                    <button className=' py-1 px-2 border-2 border-green-400 rounded-3xl '>
                      <a className='text-xs flex items-center gap-1' href={`/UpdateOrder?orderId=${order._id}`}>
                      <p>Xem đơn</p> <FaArrowRight />
                      </a>
                    </button>
                  </td>
                  <td className='px-4 py-2 text-center'>
                    <button 
                    className={`w-36 py-2 rounded-lg text-white bg-red-500`}
                    onClick={() => handleShowFormDelete(order._id)}>Hủy đơn</button>
                  </td>
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
