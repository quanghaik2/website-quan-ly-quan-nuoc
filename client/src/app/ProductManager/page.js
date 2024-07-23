'use client';
import React, { useState, useEffect } from 'react';
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'sonner';




const ProductList= () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product`);
        if (!response.ok) {
          toast.error('Lấy sản phẩm thất bại:', error);
        }
        const data = await response.json();
        console.log(data);
        setProducts(data.product); // Assuming the API response is an array of products
      } catch (error) {
        toast.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="p-4 mt-10">
      <div className='text-black'>
        <table className='min-w-full -collapse'>
          <thead className='mb-10'>
            <tr className='bg-white mb-10'>
              <th className=' px-4 py-2 text-center'>STT</th>
              <th className=' px-4 py-2 text-center'>Ảnh</th>
              <th className=' px-4 py-2 text-center'>Tên sản phẩm</th>
              <th className=' px-4 py-2 text-center'>Giá</th>
              <th className=' px-4 py-2 text-center'></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                  <td className=' px-4 py-2 text-center'>{index + 1}</td>
                  <td className=' px-4 py-2 flex justify-center'><img className='w-10' 
                  src={product.image} 
                  /></td>
                  <td className=' px-4 py-2 text-center'>{product.productName}</td>
                  <td className=' px-4 py-2 text-center'>{product.price}</td>
                  <td className=' px-4 py-2 text-center flex justify-center'>
                    <FaPen className='text-green-500 cursor-pointer' />
                    <MdDeleteForever className='text-red-500 ml-1 cursor-pointer' />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className=' px-4 py-2 text-center'>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;