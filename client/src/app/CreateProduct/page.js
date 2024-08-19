'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setProductType] = useState('');
  const [recipe, setRecipe] = useState([{ ingredient: '', quantity: '' }]);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const productTypes = ['Đồ uống', 'Đồ ăn vặt'];
  const [ingredients, setIngredients] = useState([]);
  // const ingredients = ['Ingredient1', 'Ingredient2', 'Ingredient3']; // Example ingredient list

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productName = formData.get('productName');
    const price = formData.get('price');
    const category = formData.get('category');
    const image = formData.get('image');

    // Get recipe data from form
    const recipeData = recipe.map((item, index) => ({
      ingredient: formData.get(`ingredient_${index}`),
      quantity: formData.get(`quantity_${index}`)
    }));

    useEffect( async() =>{
      try {
      
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/`);
        
        if (response.status !== 200) {
          toast.error('Lấy bàn thất bại');
          return;
        }
        const data = await response.json();
        
      } catch (error) {
        toast.error('Error fetching tables:', error);
      }
    }, [])

    // Clear previous errors
    setErrors({});

    // Validation
    const newErrors = {};
    if (!productName) {
      newErrors.productName = 'Vui lòng nhập tên sản phẩm';
    }
    if (!/^\d+$/.test(price) || price <= 0) {
      newErrors.price = 'Giá sản phẩm phải hợp lệ';
    }
    if (!/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(image)) {
      newErrors.image = 'Ảnh sản phẩm phải hợp lệ';
    }
    if (!category) {
      newErrors.category = 'Loại sản phẩm không được để trống';
    }

    // Check for duplicate ingredients
    const ingredientSet = new Set();
    recipeData.forEach((item, index) => {
      if (!item.ingredient) {
        newErrors[`ingredient_${index}`] = 'Vui lòng chọn nguyên liệu';
      } else if (ingredientSet.has(item.ingredient)) {
        newErrors[`ingredient_${index}`] = 'Nguyên liệu đã được chọn ở trường khác';
      } else {
        ingredientSet.add(item.ingredient);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, price, category, image, recipe: recipeData }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        toast.success('Thêm sản phẩm thành công');
        router.push('/ProductManager');
      } else {
        toast.error(data.message || 'Thêm sản phẩm thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleRecipeChange = (index, field, value) => {
    const newRecipe = [...recipe];
    newRecipe[index][field] = value;
    setRecipe(newRecipe);
  };

  const addRecipeItem = () => {
    setRecipe([...recipe, { ingredient: '', quantity: '' }]);
  };

  const removeRecipeItem = (index) => {
    const newRecipe = recipe.filter((_, i) => i !== index);
    setRecipe(newRecipe);
  };

  return (
    <main className='min-h-screen w-full bg-white text-black'>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Công thức</label>
            {recipe.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center">
                  <select
                    name={`ingredient_${index}`}
                    value={item.ingredient}
                    onChange={(e) => handleRecipeChange(index, 'ingredient', e.target.value)}
                    className="mr-2 p-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="" disabled>Chọn nguyên liệu</option>
                    {ingredients.map((ingredient) => (
                      <option key={ingredient} value={ingredient}>
                        {ingredient}
                      </option>
                    ))}
                  </select>
                  <input
                    name={`quantity_${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleRecipeChange(index, 'quantity', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeRecipeItem(index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded-md"
                  >
                    Xóa
                  </button>
                </div>
                {errors[`ingredient_${index}`] && (
                  <p className="text-xs mt-1 text-red-500">{errors[`ingredient_${index}`]}</p>
                )}
                {errors[`quantity_${index}`] && (
                  <p className="text-xs mt-1 text-red-500">{errors[`quantity_${index}`]}</p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addRecipeItem}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
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
}
