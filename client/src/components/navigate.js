'use client';
import React, { useContext, useState } from 'react';
import { UserContext } from '@/contexts';

const NavigationCustom = ({ menuItems, onMenuClick, onSearch }) => {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className='bg-gray-800 p-4 w-full mt-0 ml-0 mr-0'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-start gap-3 items-center'>
            <img src='/logo.png' className='w-14 rounded-xl' />
            <div className='text-white'>Hi, {user.username}</div>
          </div>
          <div className='hidden md:block'>
            <ul className='flex space-x-4'>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    className='text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'
                    onClick={() => onMenuClick(item.status)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex-shrink-0'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='px-3 py-2 rounded-md text-sm'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationCustom;
