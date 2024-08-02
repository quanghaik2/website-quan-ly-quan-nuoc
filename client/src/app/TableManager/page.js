'use client';
import EditTable from '@/components/editTable';
import FormDelete from '@/components/formDelete';
import React, { useState, useEffect } from 'react';
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'sonner';

const TableList = ({ searchTerm, refresh }) => {
  const [tables, setTables] = useState([]);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [idTable, setIdTable] = useState(null);

  const fetchTables = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/table`);
      if (response.status !== 200) {
        toast.error('Lấy bàn thất bại:', error);
      }
      const data = await response.json();
      setTables(data.table); // Assuming the API response is an array of tables
    } catch (error) {
      toast.error('Error fetching tables:', error);
    }
  };

  

  useEffect(() => {
    fetchTables();
  }, []);

  const handleShowFormDelete = (id) => {
    window.scrollTo(0, 0);
    setShowFormDelete(true);
    setIdTable(id);
  };

  const handleCloseFormData = () => {
    window.scrollTo(0, 0);
    setShowFormDelete(false);
    setShowFormUpdate(false);
  };

  const handleShowFormUpdate = (id) => {
    window.scrollTo(0, 0);
    setShowFormUpdate(true);
    setIdTable(id);
  };

  const handleDeleteSuccess = () => {
    setShowFormDelete(false);
    fetchTables();
  };

  const handleUpdateSuccess = () => {
    setShowFormUpdate(false);
    fetchTables();
  };

  // Lọc danh sách bàn dựa trên searchTerm
  const filteredTables = tables.filter(table =>
    table.tableName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mt-10">
      {showFormDelete && (
        <div className="absolute inset-0">
          <FormDelete
            onClose={handleCloseFormData}
            id={idTable}
            endpoint={'api/table/delete'}
            type='table'
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      )}
      {showFormUpdate && (
        <div className="absolute inset-0">
          <EditTable
            onClose={handleCloseFormData}
            id={idTable}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
      )}
      <div className='text-black'>
        <table className='min-w-full -collapse'>
          <thead>
            <tr className='bg-white'>
              <th className=' px-4 py-2 text-center'>STT</th>
              <th className=' px-4 py-2 text-center'>Tên bàn</th>
              <th className=' px-4 py-2 text-center'>Trạng thái</th>
              <th className=' px-4 py-2 text-center'></th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.length > 0 ? (
              filteredTables.map((table, index) => (
                <tr key={table._id} className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                  <td className=' px-4 py-2 text-center'>{index + 1}</td>
                  <td className=' px-4 py-2 text-center'>{table.tableName}</td>
                  <td className=' px-4 py-2 text-center'>{table.status === false ? 'Còn trống' : 'Đang sử dụng'}</td>
                  <td className=' px-4 py-2 flex justify-center items-center'>
                    <button onClick={() => handleShowFormUpdate(table._id)}>
                      <FaPen className='text-green-500 cursor-pointer' />
                    </button>
                    <button onClick={() => handleShowFormDelete(table._id)}>
                      <MdDeleteForever className='text-red-500 ml-1 cursor-pointer' />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className=' px-4 py-2 text-center'>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;
