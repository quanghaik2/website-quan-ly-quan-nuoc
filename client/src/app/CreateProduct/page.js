'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setProductType] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const productTypes = ['Đồ uống', 'Đồ ăn vặt'];

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
      newErrors.productName = 'Vui lòng nhập tên sản phẩm';
    }
    if (!/^\d+$/.test(price)) {
      newErrors.price = 'Giá sản phẩm phải là số';
    }
    if (!/^[a-zA-Z]/.test(image)) {
      newErrors.image = 'Ảnh sản phẩm không được bắt đầu bằng số hoặc ký tự đặc biệt';
    }
    if (!category) {
      newErrors.category = 'Loại sản phẩm không được để trống';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, price, category, image }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status  === 200) {
        toast.success('Thêm sản phẩm thành công');
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
        <h1 className="text-2xl font-bold mb-4">Thêm sản phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
            <input
              name='productName'
              type="text"
              onChange={(e) => setProductName(e.target.value)}
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
              onChange={(e) => setProductPrice(e.target.value)}
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
              onChange={(e) => setImage(e.target.value)}
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
              onChange={(e) => setProductType(e.target.value)}
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

