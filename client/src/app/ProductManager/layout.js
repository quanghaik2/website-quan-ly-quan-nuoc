'use client';

import Head from 'next/head';
import { FaPlus } from "react-icons/fa6";
import ProductList from './page';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container mx-auto bg-white">

      <main className='bg-slate-200'>
        <div className='flex justify-around items-center mt-4'>
          <h1 className='text-3xl font-bold text-black'>Quản lý sản phẩm</h1>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 text-black"
          />
          <button className='bg-green-700 mx-1 my-3 px-4 py-2 rounded-lg text-white'><a className='flex items-center' href='/CreateProduct'>Thêm Sản phẩm <FaPlus className='ml-1' /></a></button>
        </div>
        <div className='mt-10 border-blue-300 border-2 rounded-xl bg-white'>
          <ProductList searchTerm={searchTerm} />
        </div>
      </main>
    </div>
  );
}
