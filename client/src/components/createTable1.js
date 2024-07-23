'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CreateTable({ onClose }) {
  const formRef = useRef(null);
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tableName = formData.get('tableName');
    const newErrors = {};
    if (!tableName) {
      newErrors.tableName = 'Tên bàn không được để trống';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/table/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status  === 200) {
        toast.success('Thêm bàn thành công');
        router.push('/TableManager');
      } else {
        toast.error(data.message || 'Thêm bàn thất bại');
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
    <div className="max-w-md mx-auto mt-20 bg-slate-100 px-7 py-10">
      <h1 className="text-2xl font-bold mb-4 text-black">Thêm bàn</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nhập số bàn</label>
          <input
            type="text"
            name='tableName'
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.tableName && (
              <p className="text-xs mt-1 text-red-500">{errors.productName}</p>
            )}
        </div>
        
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md mr-2">
          Lưu
        </button>
        <button type="button" onClick={onClose} className="bg-red-500 text-white p-2 rounded-md">
          Hủy
        </button>
      </form>
    </div>
  );
}