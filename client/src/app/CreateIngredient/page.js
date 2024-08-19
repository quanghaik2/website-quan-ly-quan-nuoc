'use client'

import { useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AddIngredient() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const price = formData.get('price');
    const unit = formData.get('unit');

    // Clear previous errors
    setErrors({});

    // Validation
    const newErrors = {};
    if (!name || name.length > 40) {
      newErrors.name = 'Tên nguyên liệu không hợp lệ';
    }
    if (!/^\d+$/.test(price) ||  price <= 0) {
      newErrors.price = 'Giá nguyên liệu phải hợp lệ';
    }
    if (!unit || unit.length >15 ) {
      newErrors.unit = 'Đơn vị không không hợp lệ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/ingredient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, unit }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        toast.success('Thêm nguyên liệu thành công');
        router.push('/IngredientManager');
        // Thực hiện hành động sau khi thêm thành công, ví dụ: chuyển hướng
      } else {
        toast.error(data.message || 'Thêm nguyên liệu thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <main className='size-full bg-white h-dvh text-black'>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Thêm Nguyên Liệu</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên nguyên liệu</label>
            <input
              name='name'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.name && (
              <p className="text-xs mt-1 text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Giá nguyên liệu</label>
            <input
              name='price'
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.price && (
              <p className="text-xs mt-1 text-red-500">{errors.price}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Đơn vị</label>
            <input
              name='unit'
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.unit && (
              <p className="text-xs mt-1 text-red-500">{errors.unit}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Lưu
          </button>
        </form>
      </div>
    </main>
  );
}
