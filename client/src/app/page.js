'use client';

import NavigationCustom from '@/components/navigate';
import TableLayout from '@/components/tableLayout';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Home() {

  // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/product`);
  //     if (response.status !== 200) {
  //       toast.error('Lấy sản phẩm thất bại');
  //       return;
  //     }
  //     const data = await response.json();
  //     setProducts(data.product); 
  //   } catch (error) {
  //     toast.error('Error fetching products:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);



  return (
  <div className="bg-white w-full h-svh text-black p-10">
    <Head>
      <title>Table Layout</title>
      <meta name="description" content="Table layout with Next.js and Tailwind CSS" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <NavigationCustom menuItems={[
          { label: 'Home', url: '/' },
          { label: 'About', url: '/' },
          { label: 'Services', url: '/' },
          { label: 'Contact', url: '/' },
          ]}/>
      <TableLayout />
    </main>
  
  </div>
  );
}
