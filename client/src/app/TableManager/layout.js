'use client'
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import TableList from './page';
import CreateTable from '@/components/createTable1';


export default function TableManagerLayout() {
  const [showCreateTable, setShowCreateTable] = useState(false);

  const handleShowCreateTable = () => {
    setShowCreateTable(true);
  };

  const handleCloseCreateTable = () => {
    setShowCreateTable(false);
  };

  const handleCreateSuccess = () => {
    setShowCreateTable(false);  
  };
  return (
    <div className="container mx-auto bg-white">
      <div className='bg-slate-200 relative '  >
        {showCreateTable && (<div className="absolute inset-0">
          <CreateTable 
            onClose={handleCloseCreateTable}
            onCreateSuccess={handleCreateSuccess}/>
        </div>)}
        <div className='flex justify-around items-center'>
            <h1 className='text-3xl font-bold text-black'>Quản lý Bàn</h1>
            <button className='bg-green-700 mx-1 my-3 px-4 py-2 rounded-lg text-white'
              onClick={handleShowCreateTable}><p className='flex items-center'
            >Thêm bàn <FaPlus className='ml-1'/></p></button>            
        </div>
        <div className=' mt-10 border-blue-300 border-2 rounded-xl bg-white' >
            <TableList />
        </div>
      </div>
    </div>
  );
}
