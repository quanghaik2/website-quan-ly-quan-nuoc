<<<<<<< HEAD
import React from 'react'
=======
"use client"
import React from 'react';
>>>>>>> 0f57d00005f6254e0877e5c4d67a1f8809a95d51

const tables = Array.from({ length: 34 }, (_, index) => ({
   id: index + 1,
   name: `Bàn ${index + 1}`,
   status: 'available', // or 'in-use'
}))

const TableLayout = () => {
   return (
      <div className='p-4 bg-white h-dvh text-black'>
         <div className='grid grid-cols-6 gap-4'>
            {tables.map((table) => (
               <div
                  key={table.id}
                  className={`p-4 border rounded ${
                     table.status === 'in-use' ? 'bg-blue-500' : 'bg-red-100'
                  }`}>
                  {table.name}
               </div>
            ))}
         </div>
      </div>
   )
}

export default TableLayout
