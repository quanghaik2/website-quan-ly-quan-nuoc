'use client'

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ListProductPage from '@/components/ListProducts';
import { toast } from 'sonner';
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import FormDelete from '@/components/formDelete';

const UpdateOrder = () => {
  const router = useRouter();
  const searchQuery = useSearchParams();
  const orderId = searchQuery.get('orderId');
  const [tableName, setTableName] = useState('');
  const [products, setProducts] = useState([]);
  const [note, setNote] = useState('');
  const [showListOrder, setShowListOrder] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [status, setStatus] = useState('');
  const [listTableOff, setListTableOff] = useState([]);
  const [tableDefault, setTableDefault] = useState('');


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order/${orderId}`);
        const data = await response.json();
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/table/getTablesOff`);
        const dataTablesOff = await response2.json();
        setListTableOff(dataTablesOff.table);


        if (response.status  === 200) {
          setTableName(data.order.tableId.tableName);
          setTableDefault(data.order.tableId.tableName);
          setProducts(data.order.products.map(product => ({
            id: product.productId,
            name: product.nameProduct,
            price: product.price,
            quantity: product.quantity,
            totalPrice: product.price * product.quantity,
          })));
          setNote(data.order.note);
          setStatus(data.order.status);
          setTotalAmount(data.order.total_amount);
        } else {
          toast.error(data.message || 'Không thể tải đơn hàng');
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handleShowListOrder = () => {
    setShowListOrder(true);
  };

  const handleCloseFormData = () => {
    setShowListOrder(false);
  };

  const handleProductSelect = (newProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];
      calculateTotalAmount(updatedProducts);
      return updatedProducts;
    });
    setShowListOrder(false);
  };

  const handleIncrementQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    updatedProducts[index].totalPrice = updatedProducts[index].price * updatedProducts[index].quantity;
    setProducts(updatedProducts);
    calculateTotalAmount(updatedProducts);
  };

  const handleDecrementQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      updatedProducts[index].totalPrice = updatedProducts[index].price * updatedProducts[index].quantity;
    }
    setProducts(updatedProducts);
    calculateTotalAmount(updatedProducts);
  };

  const calculateTotalAmount = (productsList) => {
    const total = productsList.reduce((sum, product) => sum + product.totalPrice, 0);
    setTotalAmount(total);
  };

  const handleShowFormDelete = () => {
    setShowFormDelete(true); 
  };

  const handleDeleteSuccess = () => {
    setShowFormDelete(false);
    router.push('/OrderManager')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order/update/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          tableName,
          note,
          products: products.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            nameProduct: product.name,
            price: product.price,
          })),
          status: status,
          total_amount: totalAmount
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success('Cập nhật đơn hàng thành công');
        router.push('/OrderManager');
      } else {
        toast.error(data.message || 'Cập nhật đơn hàng thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="w-full text-black mx-auto bg-white shadow-lg rounded-lg relative">
      {showListOrder && (
        <div className="absolute inset-0">
          <ListProductPage
            onClose={handleCloseFormData} 
            productOrder={products} 
            onProductSelect={handleProductSelect}
          />
        </div>
      )}
      {showFormDelete && (
        <div className="absolute inset-0">
          <FormDelete 
          onClose={handleCloseFormData} 
          id={orderId} 
          endpoint={'api/order'} 
          type='order' 
          onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6 text-center mt-10">Cập Nhật Đơn Hàng</h1>
      <div className='flex justify-between'>
        <button className='ml-4  p-3 rounded-full border-2 border-green-500 text-green-500 cursor-pointer text-xl'><a href='/OrderManager'><FaArrowLeft/></a></button>
        <button 
        className='p-3 flex items-center gap-1 bg-red-500 text-white rounded-lg mr-4 cursor-pointer'
        onClick={() => handleShowFormDelete()}>
          <RiDeleteBin6Line/> <samp>Hủy đơn</samp> </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 ">Tên Bàn</label>
          <select
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className={`mt-1 block  p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 `}
          >
            <option value={tableDefault} className="bg-white">{tableDefault}</option>
            {listTableOff.map(table => (
              <option value={table.tableName} className="bg-white">{table.tableName}</option>
            ))}
            
          </select>
        </div>
        <button
          type="button"
          onClick={handleShowListOrder}
          className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 transition duration-200"
        >
          Thêm Sản Phẩm
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Danh Sách Sản Phẩm</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-3 text-left">Tên Sản Phẩm</th>
                <th className="border border-gray-300 p-3 text-left">Giá</th>
                <th className="border border-gray-300 p-3 text-left">Số Lượng</th>
                <th className="border border-gray-300 p-3 text-left">Tổng Giá</th>
                <th className="border border-gray-300 p-3 text-left">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.price} VNĐ</td>
                  <td className="p-3">
                    <button
                      type='button'
                      onClick={() => handleDecrementQuantity(index)}
                      className="px-2 py-1 bg-gray-300 rounded-md mr-2 hover:bg-gray-400 transition duration-200"
                    >
                      -
                    </button>
                    {product.quantity}
                    <button
                      type='button'
                      onClick={() => handleIncrementQuantity(index)}
                      className="px-2 py-1 bg-gray-300 rounded-md ml-2 hover:bg-gray-400 transition duration-200"
                    >
                      +
                    </button>
                  </td>
                  <td className="p-3">{product.totalPrice} VNĐ</td>
                  <td className="p-3">
                    <button
                      type='button'
                      onClick={() => {
                        const updatedProducts = products.filter((_, i) => i !== index);
                        const removedProductPrice = product.totalPrice;
                        setProducts(updatedProducts);
                        setTotalAmount(totalAmount - removedProductPrice);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6 mt-6">
          <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            placeholder="Nhập ghi chú"
          />
        </div>

        <div className="mb-6 mt-6">
          <label className="block text-sm font-medium text-gray-700">Trạng thái đơn hàng</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`mt-1 block  p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${
              status === 'đã lên đơn' ? 'bg-blue-200' :
              status === 'chờ thanh toán' ? 'bg-red-200' :
              status === 'hoàn thành' ? 'bg-green-200' : ''
            }`}
          >
            <option value="đã lên đơn" className="bg-white">Đã lên đơn</option>
            <option value="chờ thanh toán" className="bg-white">Chờ thanh toán</option>
            <option value="hoàn thành" className="bg-white">Hoàn thành</option>
          </select>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Tổng Tiền</h2>
          <p className="text-lg font-semibold">{totalAmount} VNĐ</p>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-md w-full mt-4 hover:bg-green-600 transition duration-200"
        >
          Cập Nhật Đơn Hàng
        </button>
      </form>
    </div>
  );
};

const UpdateOrderPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UpdateOrder/>
  </Suspense>
);

export default UpdateOrderPage;
