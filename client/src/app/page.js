'use client'; // Ensure this is at the top of your file

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import NavigationCustom from '@/components/navigate';
import TableLayout from '@/components/tableLayout';
import Head from 'next/head';

export default function Home() {

  return (
    <div className="bg-white w-full h-screen text-black p-10">
      <Head>
        <title>Table Layout</title>
        <meta name="description" content="Table layout with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavigationCustom
          menuItems={[
            { label: 'Home', url: '/' },
            { label: 'About', url: '/' },
            { label: 'Services', url: '/' },
            { label: 'Contact', url: '/' },
            { label: 'Logout', url: '/', },
          ]}
        />
        <TableLayout />
      </main>
    </div>
  );
}
