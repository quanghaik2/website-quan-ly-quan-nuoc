"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const TableLayout = () => {
   const [tables, setTables] = useState([]);
   const router = useRouter();

   const fetchTables = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/table`);
        if (response.status !== 200) {
          toast.error('Lấy bàn thất bại');
        }
        const data = await response.json();
        console.log(data);
        setTables(data.table); // Assuming the API response is an array of tables
      } catch (error) {
        toast.error('Error fetching tables:', error);
      }
    };

    useEffect(() => {
      fetchTables();
    }, []);

   const handleTableClick = (tableId, tableName) => {
      router.push(`/CreateOrder?tableId=${tableId}&tableName=${tableName}`);
   };

   return (
      <div className='p-4 bg-white h-dvh text-black'>
         <div className='grid grid-cols-6 gap-4'>
            {tables.map((table) => (
               <div
                  key={table._id}
                  className={`p-4 border rounded ${
                     table.status === false ? 'bg-green-100' : 'bg-red-100'
                  } cursor-pointer`}
                  onClick={table.status === false ? () => handleTableClick(table._id, table.tableName) : null}
               >
                  {table.tableName}
               </div>
            ))}
         </div>
      </div>
   );
};

export default TableLayout;
