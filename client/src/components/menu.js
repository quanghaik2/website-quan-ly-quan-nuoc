'use client'

import React, { useState, useContext } from 'react';
import { MdOutlineTableRestaurant } from 'react-icons/md';
import { IoLogOutOutline } from "react-icons/io5";
import { ImTable2 } from 'react-icons/im';
import { TbTableAlias, TbReportMoney } from 'react-icons/tb';
import { IoMenu, IoCloseSharp } from 'react-icons/io5';
import { RiDrinksFill } from 'react-icons/ri';
import { IoIosHome } from "react-icons/io"; 
import { UserContext } from '@/contexts';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Menu = () => {
   const [collapsed, setCollapsed] = useState(true);
   const [selectedMenu, setSelectedMenu] = useState(null);
   const [activeItem, setActiveItem] = useState(null); // State để theo dõi mục được chọn
   
   const { user } = useContext(UserContext);
   const role = user.role;
   const router = useRouter();

   const handleLogout = () => {
      Cookies.remove('role');
      router.push('/login');
   };

   const toggleCollapse = () => {
      setCollapsed(!collapsed);
   };

   const toggleSubMenu = (menu) => {
      setSelectedMenu(selectedMenu === menu ? null : menu);
   };

   const handleItemClick = (item) => {
      setActiveItem(item);
   };

   const handleSubItemClick = (e, item) => {
      setActiveItem(item);
      e.stopPropagation();
   };

  return (
    <div className={`bg-gray-800 min-h-screen ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 flex flex-col`}>
      <div className="flex-grow overflow-y-auto">
        <button onClick={toggleCollapse} className="text-white p-4 focus:outline-none">
          {collapsed ? <IoMenu className='w-10 h-10 self-end' /> : <IoCloseSharp className='w-10 h-10' />}
        </button>
        <div className="p-4">
          <div
            className={`text-white mb-6 flex items-center px-3 py-3 rounded-xl cursor-pointer ${activeItem === 'danh-sach-ban' ? 'bg-blue-500' : ''}`}
            onClick={() => handleItemClick('danh-sach-ban')}
          >
            <IoIosHome className='mr-1' />
            {!collapsed && <a href='/'>Trang chủ</a>}
          </div>
          <div
            className={`text-white mb-6 flex items-center px-3 py-3 rounded-xl cursor-pointer ${activeItem === 'danh-sach-don' ? 'bg-blue-500' : ''}`}
            onClick={() => handleItemClick('danh-sach-don')}
          >
            <ImTable2 className='mr-1' />
            {!collapsed && <a href='/OrderManager'>Quản lý đơn</a>}
          </div>
          {role === 'owner' && (
            <div className="text-white mb-6 cursor-pointer" onClick={() => { handleItemClick('quan-ly-ban'); toggleSubMenu('ban'); }}>
              <div className={`flex px-3 py-3 rounded-xl items-center ${activeItem === 'quan-ly-ban' ? 'bg-blue-500' : ''}`}>
                <TbTableAlias className='mr-1' />
                {!collapsed && <a href='/TableManager'>Quản lý bàn</a>}
              </div>
            </div>
          )}
          {role === 'owner' && (
            <div className="text-white mb-6 cursor-pointer" onClick={() => { handleItemClick('quan-ly-san-pham'); toggleSubMenu('sanpham'); }}>
              <div className={`flex px-3 py-3 rounded-xl items-center ${activeItem === 'quan-ly-san-pham' ? 'bg-blue-500' : ''}`}>
                <RiDrinksFill className='mr-1' />
                {!collapsed && <a href='/ProductManager'>Quản lý sản phẩm</a>}
              </div>
            </div>
          )}
          <div
            className="text-white mb-6 cursor-pointer"
            onClick={() => { toggleSubMenu('thong-ke'); }}
          >
            <div className={`flex px-3 py-3 rounded-xl items-center ${activeItem === 'quan-ly-san-pham' ? 'bg-blue-500' : ''}`}>
              <TbReportMoney className='w-5 h-5 mr-1' />
              {!collapsed && 'Thống kê'}
            </div>
            {selectedMenu === 'thong-ke' && (
              <div className="ml-8 mt-2">
                <div className={`text-white py-1 pl-1 mb-2 ${activeItem === 'day' ? 'bg-blue-500' : ''}`} onClick={(e) => handleSubItemClick(e, 'day')}>
                  <a href='/Statistics?type=date'>Theo ngày</a>
                  </div>
                <div className={`text-white py-1 pl-1 mb-2 ${activeItem === 'moth' ? 'bg-blue-500' : ''}`} onClick={(e) => handleSubItemClick(e, 'moth')}>
                  <a href='/Statistics?type=month'>Theo tháng</a>
                  </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
        <button className='text-white p-4 hover:bg-gray-700 w-full text-left border-t border-gray-700' onClick={handleLogout}>
          {collapsed ? <IoLogOutOutline className="w-6 h-6 mx-auto" /> : <div className='flex item-center gap-2'><span>Đăng xuất</span><IoLogOutOutline className="w-6 h-6" /></div>}
        </button>
    </div>
  );
};

export default Menu;

