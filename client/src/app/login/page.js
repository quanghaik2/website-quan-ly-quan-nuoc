'use client'
import Head from 'next/head';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-[#dce0e8] ">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page using Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <div className='flex items-center justify-center'>
          <img src='/logo.png' className='w-14 rounded-xl'/>
          <h2 className="text-3xl font-bold text-center text-black ml-2" ><span className='text-pink-300'>CBP</span> menu</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-pink-300 rounded-md hover:bg-pink-500"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
