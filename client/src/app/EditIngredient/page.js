'use client';

import { Suspense, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParams, useRouter } from 'next/navigation';

function EditIngredient() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const ingredientResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/ingredient/${id}`);

        if (ingredientResponse.status !== 200) {
          toast.error('Lấy thông tin nguyên liệu thất bại');
          return;
        }

        const ingredientData = await ingredientResponse.json();
        setName(ingredientData.ingredient.name);
        setPrice(ingredientData.ingredient.price);
        setUnit(ingredientData.ingredient.unit);
      } catch (error) {
        toast.error('Có lỗi xảy ra khi lấy thông tin nguyên liệu');
      }
    };

    fetchIngredient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const price = formData.get('price');
    const unit = formData.get('unit');

    // Xóa lỗi cũ
    setErrors({});

    // Validation
    const newErrors = {};
    if (!name || name.length > 40) {
      newErrors.name = 'Tên nguyên liệu không hợp lệ (tối đa 40 ký tự)';
    }
    if (!/^\d+$/.test(price) || price <= 0) {
      newErrors.price = 'Giá nguyên liệu phải hợp lệ và lớn hơn 0';
    }
    if (!unit || unit.length > 15) {
      newErrors.unit = 'Đơn vị không hợp lệ (tối đa 15 ký tự)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/ingredient/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, unit }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('Cập nhật nguyên liệu thành công');
        router.push('/IngredientManager');
      } else {
        toast.error(data.message || 'Cập nhật nguyên liệu thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <main className='min-h-screen w-full bg-white text-black'>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Nguyên Liệu</h1>
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

const EditIngredientPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditIngredient />
  </Suspense>
);

export default EditIngredientPage;
