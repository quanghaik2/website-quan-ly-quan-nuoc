import React from 'react';
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


const tables = Array.from({ length: 34 }, (_, index) => ({
  id: index + 1,
  name: `Bàn ${index + 1}`,
  status: 'available', // or 'in-use'
}));

const ProductList= () => {
  return (
    <div className="p-4">
      <div className="">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`p-4 size-full ${
              table.id % 2 === 0 ? 'bg-white' : 'bg-pink-50'
            } text-black flex justify-between items-center `}
          >
            {table.name}
            <div className=' flex'>
                <FaPen/> 
                <MdDeleteForever/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;