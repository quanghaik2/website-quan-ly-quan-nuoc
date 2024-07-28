'use client'

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ListProductPage from '@/components/ListProducts';
import { toast } from 'sonner';

const CreateOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tableId = searchParams.get('tableId');
  const tableName = searchParams.get('tableName');
  const [products, setProducts] = useState([]);
  const [note, setNote] = useState('');
  const [showListOrder, setShowListOrder] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    const filteredProducts = storedProducts.filter(product => product && product.name && product.price); // Loại bỏ giá trị rỗng
    setProducts(filteredProducts);
    calculateTotalAmount(filteredProducts);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          tableId,
          note,
          products: products.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            nameProduct: product.name,
            price: product.price
          })),
          total_amount: totalAmount
         }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status  === 200) {
        toast.success('Thêm sản phẩm thành công');
        router.push('/OrderManager');
      } else {
        toast.error(data.message || 'Thêm sản phẩm thất bại');
      }
    } catch (error) {
      toast.error(error + 'Có lỗi xảy ra. Vui lòng thử lại.');
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
      <h1 className="text-2xl font-bold mb-6 text-center">Tạo Đơn Hàng</h1>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Tên Bàn</label>
          <input
            type="text"
            value={tableName || ''} 
            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            placeholder="Nhập tên bàn"
            disabled
          />
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

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Tổng Tiền</h2>
          <p className="text-lg font-semibold">{totalAmount} VNĐ</p>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-md w-full mt-4 hover:bg-green-600 transition duration-200"
        >
          Tạo Đơn Hàng
        </button>
      </form>
    </div>
  );
};

const CreateOrderPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateOrder/>
  </Suspense>
)

export default CreateOrderPage;
