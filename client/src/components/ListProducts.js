import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';

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

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8080'); // Đảm bảo URL này đúng với server của bạn
 
  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.action === 'productUpdate') {
  //       setProducts((prevProducts) => [...prevProducts, data.product]);
  //     }
  //   };
 
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  const handleProductClick = (product) => {
    const newProduct = {
      id: product._id,
      name: product.productName,
      price: product.price,
      quantity: 1,
      totalPrice: product.price,
      recipe: product.recipe,
    };
    onProductSelect(newProduct);
  };

  const filteredProducts = products.filter(product => 
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white w-full h-full text-black p-4 overflow-y-hidden" ref={formRef}>
      <div className='fixed w-full bg-white'>
        <div className=' w-5/6 flex justify-end '>
          <button className='p-2 bg-red-500 rounded-sm text-white font-bold text-2xl' onClick={onClose}>
            <IoCloseSharp/>
          </button>
        </div>
        <div className='mb-2 mt-6'>
          <input
            type="text"
            className="w-5/6 p-2 border border-gray-300 rounded"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className='mt-36 overflow-y-auto h-[calc(100%-6rem)]'>
        <div className='grid gap-6 grid-cols-5  pb-8'>
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
    </div>
  );
};

export default ListProductPage;
