'use client'; // Ensure this is at the top of your file

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NavigationCustom from '@/components/navigate';
import TableLayout from '@/components/tableLayout';
import Head from 'next/head';
import { connectWebSocket, sendMessage } from '../../socketClient';

export default function Home() {
  const [tableStatus, setTableStatus] = useState(''); // State để lưu trữ trạng thái bàn
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu trữ truy vấn tìm kiếm

  // useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:8080');

  //   socket.onopen = () => {
  //     console.log('Connected to WebSocket server');
  //   };

  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('WebSocket message received:', data);
  //     // Handle changes from WebSocket here
  //     if (data.fullDocument) {
  //       setTables(prevTables => {
  //         const updatedTables = [...prevTables];
  //         const index = updatedTables.findIndex(table => table._id === data.documentKey._id);
  //         if (index > -1) {
  //           updatedTables[index] = data.fullDocument;
  //         } else {
  //           updatedTables.push(data.fullDocument);
  //         }
  //         return updatedTables;
  //       });
  //     }
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);
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
