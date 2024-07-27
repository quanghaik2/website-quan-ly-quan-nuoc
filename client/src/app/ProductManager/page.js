'use client';
import FormDelete from '@/components/formDelete';
import React, { useState, useEffect } from 'react';
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'sonner';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [idProduct, setIdProduct] = useState(null);

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

  const handleShowFormDelete = (id) => {
    setShowFormDelete(true);
    setIdProduct(id);
  };

  const handleCloseFormData = () => {
    setShowFormDelete(false);
  };

  const handleDeleteSuccess = () => {
    setShowFormDelete(false);
    // Load lại trang hoặc fetch lại dữ liệu
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 mt-10 relative">
      {showFormDelete && (
        <div className="absolute inset-0">
          <FormDelete 
          onClose={handleCloseFormData} 
          id={idProduct} 
          endpoint={'api/product/delete'} 
          type='product' 
          onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      )}
      <div className='text-black'>
        <table className='min-w-full table-auto'>
          <thead className='mb-10'>
            <tr className='bg-white mb-10'>
              <th className='px-4 py-2 text-center'>STT</th>
              <th className='px-4 py-2 text-center'>Ảnh</th>
              <th className='px-4 py-2 text-center'>Tên sản phẩm</th>
              <th className='px-4 py-2 text-center'>Giá</th>
              <th className='px-4 py-2 text-center'></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                  <td className='px-4 py-2 text-center'>{index + 1}</td>
                  <td className='px-4 py-2 flex justify-center'>
                    <img className='w-10' src={product.image} alt={product.productName} />
                  </td>
                  <td className='px-4 py-2 text-center'>{product.productName}</td>
                  <td className='px-4 py-2 text-center'>{product.price}</td>
                  <td className='px-4 py-2 flex justify-center items-center'>
                    <a href={`/EditProduct?id=${product._id}`}><FaPen className='text-green-500 cursor-pointer' /></a>
                    <button onClick={() => handleShowFormDelete(product._id)}>
                      <MdDeleteForever className='text-red-500 ml-1 cursor-pointer' />
                    </button>
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

export default ProductList;
