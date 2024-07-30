'use client'; // Ensure this is at the top of your file

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NavigationCustom from '@/components/navigate';
import TableLayout from '@/components/tableLayout';
import Head from 'next/head';

export default function Home() {
  const [tableStatus, setTableStatus] = useState(''); // State để lưu trữ trạng thái bàn
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu trữ truy vấn tìm kiếm

  // Hàm xử lý khi người dùng chọn mục từ menu
  const handleMenuClick = (status) => {
    setTableStatus(status);
  };

  // Hàm xử lý khi người dùng nhập truy vấn tìm kiếm
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-white w-full h-screen text-black ">
      <Head>
        <title>Table Layout</title>
        <meta name="description" content="Table layout with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavigationCustom
          menuItems={[
            { label: 'Bàn trống', status: 'empty' },
            { label: 'Bàn đang phục vụ', status: 'serving' },
            { label: 'Xem tất cả bàn', status: 'show-all-table' },
          ]}
          onMenuClick={handleMenuClick}
          onSearch={handleSearch}
        />
        <TableLayout tableStatus={tableStatus} searchQuery={searchQuery} />
      </main>
    </div>
  );
}
