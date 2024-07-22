'use client'

import React, { useState } from 'react'
import { MdOutlineTableRestaurant } from 'react-icons/md'
import { ImTable2 } from 'react-icons/im'
import { TbTableAlias, TbReportMoney } from 'react-icons/tb'
import { IoMenu, IoCloseSharp } from 'react-icons/io5'
import { RiDrinksFill } from 'react-icons/ri'

const Menu = () => {
   const [collapsed, setCollapsed] = useState(true)
   const [selectedMenu, setSelectedMenu] = useState(null)
   const [activeItem, setActiveItem] = useState(null) // State để theo dõi mục được chọn

   const toggleCollapse = () => {
      setCollapsed(!collapsed)
   }

   
   const toggleSubMenu = (menu) => {
      setSelectedMenu(selectedMenu === menu ? null : menu)
   }

   const handleItemClick = (item) => {
      setActiveItem(item)
   }

   const handleSubItemClick = (e, item) => {
      setActiveItem(item)
      e.stopPropagation()
   }

   return (
      <div
         className={`bg-gray-800 min-h-screen ${
            collapsed ? 'w-20' : 'w-64'
         } transition-all duration-300`}>
         <button
            onClick={toggleCollapse}
            className='text-white p-4 focus:outline-none'>
            {collapsed ? (
               <IoMenu className='w-10 h-10 self-end' />
            ) : (
               <IoCloseSharp className='w-10 h-10' />
            )}
         </button>
         <div className='p-4'>
            <div
               className={`text-white mb-6 flex items-center px-3 py-3 rounded-xl cursor-pointer ${
                  activeItem === 'danh-sach-ban' ? 'bg-blue-500' : ''
               }`}
               onClick={() => handleItemClick('danh-sach-ban')}>
               <MdOutlineTableRestaurant className='mr-1' />
               {!collapsed && <a href='/TablePage'>Danh Sách bàn</a>}
            </div>
            <div
               className={`text-white mb-6 flex items-center  px-3 py-3 rounded-xl cursor-pointer ${
                  activeItem === 'danh-sach-don' ? 'bg-blue-500' : ''
               }`}
               onClick={() => handleItemClick('danh-sach-don')}>
               <ImTable2 className='mr-1' />
               {!collapsed && 'Danh sách đơn'}
            </div>
            <div
               className='text-white mb-6 cursor-pointer'
               onClick={() => {
                  handleItemClick('quan-ly-ban')
                  toggleSubMenu('ban')
               }}>
               <div
                  className={`flex  px-3 py-3 rounded-xl items-center ${
                     activeItem === 'quan-ly-ban' ? 'bg-blue-500' : ''
                  }`}>
                  <TbTableAlias className='mr-1' />
                  {!collapsed && <a href='/TableManager'>Quản lý bàn</a>}
               </div>
               {selectedMenu === 'ban' && (
                  <div className='ml-8 mt-2'>
                     <div
                        className={`text-white py-1 pl-1 mb-2 ${
                           activeItem === 'them-ban' ? 'bg-blue-500' : ''
                        }`}
                        onClick={(e) => handleSubItemClick(e, 'them-ban')}>
                        Thêm bàn
                     </div>
                     <div
                        className={`text-white py-1 pl-1 mb-2 ${
                           activeItem === 'sua-ban' ? 'bg-blue-500' : ''
                        }`}
                        onClick={(e) => handleSubItemClick(e, 'sua-ban')}>
                        Sửa bàn
                     </div>
                     <div
                        className={`text-white py-1 pl-1 mb-2 ${
                           activeItem === 'xoa-ban' ? 'bg-blue-500' : ''
                        }`}
                        onClick={(e) => handleSubItemClick(e, 'xoa-ban')}>
                        Xóa bàn
                     </div>
                  </div>
               )}
            </div>
            <div
               className='text-white mb-6 cursor-pointer'
               onClick={() => {
                  handleItemClick('quan-ly-san-pham')
                  toggleSubMenu('sanpham')
               }}>
               <div
                  className={`flex px-3 py-3 rounded-xl items-center ${
                     activeItem === 'quan-ly-san-pham' ? 'bg-blue-500' : ''
                  }`}>
                  <RiDrinksFill className='mr-1' />
                  {!collapsed && 'Quản lý sản phẩm'}
               </div>
               {selectedMenu === 'sanpham' && (
                  <div className='ml-8 mt-2'>
                     <div
                        className={`text-white py-1 pl-1 mb-2 ${
                           activeItem === 'them-san-pham' ? 'bg-blue-500' : ''
                        }`}
                        onClick={(e) => handleSubItemClick(e, 'them-san-pham')}>
                        Thêm sản phẩm
                     </div>
                     <div
                        className={`text-white py-1 pl-1 mb-2 ${
                           activeItem === 'sua-san-pham' ? 'bg-blue-500' : ''
                        }`}
                        onClick={(e) => handleSubItemClick(e, 'sua-san-pham')}>
                        Sửa sản phẩm
                     </div>
                     <div
                        className={`text-white py-1 pl-1 mb-2 ${
                           activeItem === 'xoa-san-pham' ? 'bg-blue-500' : ''
                        }`}
                        onClick={(e) => handleSubItemClick(e, 'xoa-san-pham')}>
                        Xóa sản phẩm
                     </div>
                  </div>
               )}
            </div>
            <div
               className={`text-white mb-6 flex items-center cursor-pointer ${
                  activeItem === 'thong-ke' ? 'bg-blue-500' : ''
               }`}
               onClick={() => handleItemClick('thong-ke')}>
               <TbReportMoney className='w-5 h-5 mr-1' />
               {!collapsed && 'Thống kê'}
            </div>
         </div>
      </div>
   )
}

export default Menu
