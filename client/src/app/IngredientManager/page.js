'use client';
import FormDelete from '@/components/formDelete';
import React, { useState, useEffect } from 'react';
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'sonner';

const IngredientList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [idIngredient, setIdIngredient] = useState(null);

  const fetchIngredient = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/ingredient`);
      if (response.status !== 200) {
        toast.error('Lấy sản nguyên liệu thất bại');
        return;
      }
      const data = await response.json();
      setIngredients(data.ingredients);
    } catch (error) {
      toast.error('Error fetching products:', error);
    }
  };

  const handleShowFormDelete = (id) => {
    window.scrollTo(0, 0);
    setShowFormDelete(true);
    setIdIngredient(id);
  };

  const handleCloseFormData = () => {
    setShowFormDelete(false);
  };

  const handleDeleteSuccess = () => {
    setShowFormDelete(false);
    fetchIngredient();
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  const filteredIngredient = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mt-10 relative">
      {showFormDelete && (
        <div className="absolute inset-0">
          <FormDelete
            onClose={handleCloseFormData}
            id={idIngredient}
            endpoint={'api/ingredient/delete'}
            type='ingredient'
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      )}
      <div className='text-black'>
        <table className='min-w-full table-auto'>
          <thead className='mb-10'>
            <tr className='bg-white mb-10'>
              <th className='px-4 py-2 text-center'>STT</th>
              <th className='px-4 py-2 text-center'>Tên sản phẩm</th>
              <th className='px-4 py-2 text-center'>Giá</th>
              <th className='px-4 py-2 text-center'>Đơn vị</th>
              <th className='px-4 py-2 text-center'></th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredient.length > 0 ? (
              filteredIngredient.map((ingredient, index) => (
                <tr key={ingredient._id} className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                  <td className='px-4 py-2 text-center'>{index + 1}</td>
                  <td className='px-4 py-2 text-center'>{ingredient.name}</td>
                  <td className='px-4 py-2 text-center'>{ingredient.price}</td>
                  <td className='px-4 py-2 text-center'>{ingredient.unit}</td>
                  <td className='px-4 py-2 flex justify-center items-center'>
                    <a href={`/EditIngredient?id=${ingredient._id}`}><FaPen className='text-green-500 cursor-pointer' /></a>
                    <button onClick={() => handleShowFormDelete(ingredient._id)}>
                      <MdDeleteForever className='text-red-500 ml-1 cursor-pointer' />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='px-4 py-2 text-center'>Không tìm thấy nguyên liệu nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientList;
