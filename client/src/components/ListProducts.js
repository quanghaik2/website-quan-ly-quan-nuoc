"use client"

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { IoCloseSharp } from 'react-icons/io5'

const ListProductPage = ({ onClose, onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const formRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product`);
      if (response.status !== 200) {
        toast.error('Lấy sản phẩm thất bại');
        return;
      }
      const data = await response.json();
      setProducts(data.product); 
    } catch (error) {
      toast.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Đảm bảo URL này đúng với server của bạn
 
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === 'productUpdate') {
        setProducts((prevProducts) => [...prevProducts, data.product]);
      }
    };
 
    return () => {
      ws.close();
    };
  }, []);

  const handleProductClick = (product) => {
    const newProduct = {
      id: product._id,
      name: product.productName,
      price: product.price,
      quantity: 1,
      totalPrice: product.price
    };
    onProductSelect(newProduct);
  };

  const filteredProducts = products.filter(product => 
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white w-full h-svh text-black p-10" ref={formRef}>
      <div className='w-full flex justify-end mb-8'>
        <button className='p-2 bg-red-500 rounded-sm text-white font-bold text-2xl' onClick={onClose}>
          <IoCloseSharp/>
        </button>
      </div>
      <div className='mb-4'>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='grid gap-6 grid-cols-5'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div 
              key={product._id} 
              className='bg-pink-50 cursor-pointer'
              onClick={() => handleProductClick(product)}
            >
              <div className='px-2 py-2 flex justify-center'>
                <img className='w-28 h-28' src={product.image} alt={product.productName} />
              </div>
              <div className='px-4 py-2 text-center'>
                <p className='font-bold'>{product.productName}</p>
              </div>                 
            </div>
          ))
        ) : (
          <div>
            <p className='px-4 py-2 text-center'>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProductPage;
