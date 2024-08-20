'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateStorageStatisticPage = () => {
  const [status, setStatus] = useState('');
  const [recipe, setRecipe] = useState([{ ingredient: '', quantity: '' }]);
  const [ingredients, setIngredients] = useState([]);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/ingredient`);
        const data = await response.json();
        setIngredients(data.ingredients);
      } catch (error) {
        toast.error('Có lỗi xảy ra khi lấy danh sách nguyên liệu');
      }
    };

    fetchIngredients();
  }, []);

  const handleRecipeChange = (index, field, value) => {
    const newRecipe = [...recipe];
    newRecipe[index][field] = value;
    setRecipe(newRecipe);
  };

  const addIngredient = () => {
    setRecipe([...recipe, { ingredient: '', quantity: '' }]);
  };

  const removeIngredient = (index) => {
    setRecipe(recipe.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Xóa lỗi trước đó
    setErrors({});

    // Kiểm tra lỗi
    const newErrors = {};
    if (!status) {
      newErrors.status = 'Trạng thái không được để trống';
    }

    recipe.forEach((item, index) => {
      if (!item.ingredient) {
        newErrors[`ingredient_${index}`] = 'Nguyên liệu không được để trống';
      }
      if (!item.quantity || item.quantity <= 0) {
        newErrors[`quantity_${index}`] = 'Số lượng phải lớn hơn 0';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/storage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, recipe }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('Thống kê kho được tạo thành công');
        router.push('/Statistics');
      } else {
        toast.error(data.message || 'Tạo thống kê kho thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <main className="min-h-screen w-full bg-white text-black">
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Tạo thống kê kho</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
            >
              <option value="" disabled>Chọn trạng thái</option>
              <option value="in">Nhập kho</option>
              <option value="out">Xuất kho</option>
            </select>
            {errors.status && (
              <p className="text-xs mt-1 text-red-500">{errors.status}</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="block text-sm font-medium text-gray-700">Công thức</h2>
            {recipe.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <select
                  name={`ingredient_${index}`}
                  value={item.ingredient}
                  onChange={(e) => handleRecipeChange(index, 'ingredient', e.target.value)}
                  className="block w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="" disabled>Chọn nguyên liệu</option>
                  {ingredients.map((ingredient) => (
                    <option key={ingredient._id} value={ingredient._id}>
                      {ingredient.name}
                    </option>
                  ))}
                </select>
                <input
                  name={`quantity_${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleRecipeChange(index, 'quantity', e.target.value)}
                  className="block w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500"
                >
                  Xóa
                </button>
                <div>
                  {errors[`ingredient_${index}`] && (
                    <p className="text-xs mt-1 text-red-500">{errors[`ingredient_${index}`]}</p>
                  )}
                  {errors[`quantity_${index}`] && (
                    <p className="text-xs mt-1 text-red-500">{errors[`quantity_${index}`]}</p>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 text-blue-500"
            >
              Thêm nguyên liệu
            </button>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
            Lưu
          </button>
        </form>
      </div>
    </main>
  );
};



export default CreateStorageStatisticPage;
