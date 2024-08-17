'use client'
import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation'

const EditProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setProductPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const searchParams = useSearchParams()
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const productTypes = ['Đồ uống', 'Đồ ăn vặt'];
    const id = searchParams.get('id');

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product/getProduct?id=${id}`);
            if (response.status !=200) {
              toast.error('Lấy sản phẩm thất bại:');
            }
            const data = await response.json();
            console.log(data);
            setProductName(data.product.productName);
            setProductPrice(data.product.price);
            setImage(data.product.image);
            setCategory(data.product.category);// Assuming the API response is an array of products
            
          } catch (error) {
            toast.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productName = formData.get('productName');
    const price = formData.get('price');
    const category = formData.get('category');
    const image = formData.get('image');
    


    // Clear previous errors
    setErrors({});

    // Validation
    const newErrors = {};
    if (!productName) {
      newErrors.productName = 'Tên sản phẩm không được để trống';
    }
    if (!/^\d+$/.test(price) && price > 0) {
      newErrors.price = 'Giá sản phẩm không hợp lệ';
    }
    if (!/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(image)) {
      newErrors.image = 'Ảnh sản phẩm phải hợp lệ';
    }
    if (!category) {
      newErrors.category = 'Loại sản phẩm không được để trống';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, price, category, image }),
      });

      const data = await response.json();
      console.log(data);
      console.log(id);

      if (response.status  === 200) {
        toast.success('Sửa sản phẩm thành công');
        router.push('/ProductManager');
      } else {
        toast.error(data.message || 'Thêm sản phẩm thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <main className='size-full bg-white h-dvh text-black'>
      <div className="max-w-md mx-auto mt-10">
        
        <h1 className="text-2xl font-bold mb-4">SỬa thông tin sản phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
            <input
              name='productName'
              type="text"
              value={productName}
              onChange={(e)=> setProductName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.productName && (
              <p className="text-xs mt-1 text-red-500">{errors.productName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
            <input
              name='price'
              type="number"
              value={price}
              onChange={(e)=> setProductPrice(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.price && (
              <p className="text-xs mt-1 text-red-500">{errors.price}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ảnh sản phẩm</label>
            <input
              name='image'
              type="text"
              value={image}
              onChange={(e)=> setImage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.image && (
              <p className="text-xs mt-1 text-red-500">{errors.image}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Loại sản phẩm</label>
            <select
                name='category'
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="" disabled>Chọn loại sản phẩm</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs mt-1 text-red-500">{errors.category}</p>
            )}
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
            Lưu
          </button>
        </form>
      </div>
    </main>
  );
}

const EditProductPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditProduct />
  </Suspense>
);

export default EditProductPage;
