import Head from 'next/head';
import { FaPlus } from "react-icons/fa6";
import TableList from './page';


export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Table Layout</title>
        <meta name="description" content="Table layout with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-slate-200'>
        <div className='flex justify-around items-center'>
            <h1 className='text-3xl font-bold text-black'>Quản lý Bàn</h1>
            <button className='bg-green-700 mx-1 my-3 px-4 py-2 rounded-lg text-white'><a href='/CreateTable' className='flex items-center'>Thêm bàn <FaPlus className='ml-1'/></a></button>            
        </div>
        <div className=' mt-10 border-blue-300 border-2 rounded-xl bg-white' >
            <TableList/>
        </div>
      </main>
    </div>
  );
}
