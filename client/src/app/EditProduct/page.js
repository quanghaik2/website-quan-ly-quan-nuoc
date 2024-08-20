'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const EditProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [recipe, setRecipe] = useState([{ ingredient: '', quantity: '' }]);
  const [errors, setErrors] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const productTypes = ['Đồ uống', 'Đồ ăn vặt'];
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ingredientResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/ingredient`);
        const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product/getProduct?id=${id}`);

        if (!productResponse.ok || !ingredientResponse.ok) {
          toast.error('Lấy sản phẩm hoặc nguyên liệu thất bại');
          return;
        }

        const productData = await productResponse.json();
        const ingredientData = await ingredientResponse.json();

        setProductName(productData.product.productName);
        setProductPrice(productData.product.price);
        setImage(productData.product.image);
        setCategory(productData.product.category);
        setRecipe(productData.product.recipe || []);
        setIngredients(ingredientData.ingredients);
      } catch (error) {
        toast.error('Có lỗi xảy ra khi lấy thông tin sản phẩm');
      }
    };

    if (id) {
      fetchProduct();
    } else {
      toast.error('ID sản phẩm không hợp lệ');
    }
  }, [id]);

  const handleRecipeChange = (index, field, value) => {
    const newRecipe = [...recipe];
    if (field === 'ingredient') {
      const ingredient = ingredients.find(ing => ing.name === value);
      newRecipe[index].ingredient = ingredient ? ingredient._id : '';
    } else {
      newRecipe[index][field] = value;
    }
    setRecipe(newRecipe);
  };

  const addIngredient = () => {
    setRecipe([...recipe, { ingredient: '', quantity: '' }]);
  };

  const removeIngredient = (index) => {
    setRecipe(recipe.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!productName.trim()) {
      newErrors.productName = 'Tên sản phẩm không được để trống';
    }
    if (!/^\d+$/.test(price) || price <= 0) {
      newErrors.price = 'Giá sản phẩm không hợp lệ';
    }
    if (!/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(image)) {
      newErrors.image = 'Ảnh sản phẩm phải hợp lệ';
    }
    if (!category.trim()) {
      newErrors.category = 'Loại sản phẩm không được để trống';
    }

    recipe.forEach((item, index) => {
      if (!item.ingredient.trim()) {
        newErrors[`ingredient_${index}`] = 'Nguyên liệu không được để trống';
      }
      if (!item.quantity || item.quantity <= 0) {
        newErrors[`quantity_${index}`] = 'Số lượng phải lớn hơn 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const updatedRecipe = recipe.map(item => ({
        ingredient: item.ingredient,
        quantity: item.quantity,
      }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, price, category, image, recipe: updatedRecipe }),
      });

      if (response.ok) {
        toast.success('Sửa sản phẩm thành công');
        router.push('/ProductManager');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Sửa sản phẩm thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <main className="min-h-screen w-full bg-white text-black">
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Sửa thông tin sản phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
            <input
              name="productName"
              type="text"
              value={productName}
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
              name="price"
              type="number"
              value={price}
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
              name="image"
              type="text"
              value={image}
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
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          <div className="mb-4">
            <h2 className="block text-sm font-medium text-gray-700">Công thức</h2>
            {recipe.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <select
                  name={`ingredient_${index}`}
                  value={item.ingredient.name}
                  onChange={(e) => handleRecipeChange(index, 'ingredient', e.target.value)}
                  className="block w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="" disabled>Chọn nguyên liệu</option>
                  {ingredients.map((ingredient) => (
                    <option key={ingredient._id} value={ingredient.name}>
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
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <EditProduct />
    </Suspense>
  );
}
