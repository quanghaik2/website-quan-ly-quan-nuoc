'use client'

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function FormDelete({ onClose, type, endpoint, id ,onDeleteSuccess}) {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${endpoint}/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      console.log(data);

      if (response.status  == 200) {
        toast.success('Xóa thành công');
        onDeleteSuccess();
      } else {
        toast.error(data.message || 'Xóa thất bại');
      }
    } catch (error) {
      toast.error(`Có lỗi xảy ra. Vui lòng thử lại. ${error}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="max-w-md mx-auto mt-20 bg-slate-100 px-7 py-10 shadow-lg shadow-green-300 drop-shadow-lg">
      
      <form onSubmit={handleSubmit}>
        <div>
            {type === 'table' ? (<p className="text-xl font-bold mb-4 text-black">Bạn có chắc muốn xóa bàn không</p>) :(<p className='text-2xl font-bold mb-4 text-black'>Bạn có chắc muốn xóa sản phẩm không</p>)}
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md mr-2">
          Xóa
        </button>
        <button type="button" onClick={onClose} className="bg-red-500 text-white p-2 rounded-md">
          Hủy
        </button>
      </form>
    </div>
  );
}