'use client'
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useState, useContext } from 'react';
import { UserContext } from '@/contexts'; 
import Image from 'next/image';
import logo from '/public/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useState(true);
  const router = useRouter();
  const {setUser} = useContext(UserContext);

  const validateForm = () => {
    let formErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      formErrors.email = 'username không được để trống';
      isValid = false;
    }

    if (!password) {
      formErrors.password = 'Mật khẩu không được để trống';
      isValid = false;
    } else if (password.length < 8) {
      formErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password }),
        });

        const data = await response.json();
        console.log(data);

        if (response.status  === 200) {
          
          Cookies.set('role', data.role, { expires: 1 });
          Cookies.set('username', data.username, { expires: 1 });
          setUser({role: data.role, username: data.username});
          toast.success('Đăng nhập thành công');
          router.push('/');
        } else {
          toast.error( email + " " + password);
          setAuth(false);
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại.' + error);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-[#dce0e8] text-black ">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page using Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <div className='flex items-center justify-center'>
          <Image src={logo} alt='Logo' width={56} height={56} className='rounded-xl' />
          <h2 className="text-3xl font-bold text-center text-black ml-2" ><span className='text-pink-300'>CBP</span> menu</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tài khoản</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              required
              autoComplete="current-email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
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
