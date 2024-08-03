import { Inter } from 'next/font/google';
import './globals.css';
import Menu from '@/components/menu';
import { Toaster } from 'sonner';
import { cookies } from 'next/headers';
import { UserProvider } from '@/contexts';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
   title: 'Website quản lý CBP Menu',
   description: 'Cái gì cũng có miễn là bạn có tiền',
};

export default function RootLayout({ children }) {
   // const role = cookies().get("role");
   // const role = 'owner';
   return (
      <html lang='en'>
         <body className={inter.className}>
            <UserProvider>
               <Toaster position='top-right' richColors />
               <div className='flex'>
                  <Menu />
                  {children}
               </div>
            </UserProvider>
         </body>
      </html>
   );
}
