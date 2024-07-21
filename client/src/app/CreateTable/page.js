'use client'

import { useState } from 'react';

export default function AddTable() {
  const [productName, setProductName] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      price: productPrice,
      type: productType,
    };
    console.log(newProduct);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add Table</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nhập số bàn</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
          Lưu
        </button>
      </form>
    </div>
  );
}