'use client'
import React from 'react'

const NavigationCustom = ({ menuItems }) => {
   return (
      <nav className='bg-gray-800 p-4 w-full'>
         <div className='max-w-7xl mx-auto'>
            <div className='flex justify-between items-center'>
               {/* Logo or site title */}
               <div className='flex-shrink-0 '>
                  <img src='/logo.png' className='w-14 rounded-xl' />
               </div>

               {/* Navigation menu */}
               <div className='hidden md:block'>
                  <ul className='flex space-x-4'>
                     {menuItems.map((item, index) => (
                        <li key={index}>
                           <a
                              href={item.url}
                              className='text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'>
                              {item.label}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Search box */}
               <div className='flex-shrink-0'>
                  <input
                     type='text'
                     placeholder='Tìm kiếm...'
                     className='px-3 py-2 rounded-md text-sm'
                  />
               </div>
            </div>
         </div>
      </nav>
   )
}

export default NavigationCustom
