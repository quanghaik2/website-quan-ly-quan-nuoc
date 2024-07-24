import Head from 'next/head';
import { FaPlus } from "react-icons/fa6";
import ProductList from './page';


export default function Home() {
  return (
    <div className="container mx-auto bg-white">
      <Head>
        <title>Product Layout</title>
        <meta name="description" content="Table layout with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-slate-200'>
        <div className='flex justify-around items-center'>
            <h1 className='text-3xl font-bold text-black'>Quản lý sản phẩm</h1>
            <button className='bg-green-700 mx-1 my-3 px-4 py-2 rounded-lg text-white'><a className='flex items-center' href='/CreateProduct'>Thêm Sản phẩm <FaPlus className='ml-1'/></a></button>            
        </div>
        <div className=' mt-10 border-blue-300 border-2 rounded-xl bg-white' >
            <ProductList/>
        </div>
      </main>
    </div>
  );
}
