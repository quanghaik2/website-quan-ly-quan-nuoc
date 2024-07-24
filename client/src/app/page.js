'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Home() {

  const [products, setProducts] = useState([]);

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
  }, []);



  return (
  <div className="bg-white w-full h-svh text-black p-10">
      <div className='grid gap-6 grid-cols-5'>
      {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className= 'bg-pink-50 cursor-pointer'>
                  <div className='px-2 py-2 flex justify-center'>
                    <img className='w-28 h-28' src={product.image} alt={product.productName} />
                  </div>
                  <div className='px-4 py-2 text-center'><p className='font-bold'>{product.productName}</p></div>                 
                </div>
              ))
            ) : (
              <div>
                <p colSpan="5" className='px-4 py-2 text-center'>Loading...</p>
              </div>
            )}
      </div>
  </div>
  );
}
