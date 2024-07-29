// client/middleware.js

import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log('Middleware active on path:', pathname); // Log để kiểm tra middleware có hoạt động

  // Bỏ qua middleware cho trang đăng nhập
  if (pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Kiểm tra cookie
  const cookie = getCookie('role', { req: request });
  
  if (!cookie) {
    // Chuyển hướng đến trang đăng nhập nếu không có cookie
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  // Cho phép truy cập nếu có cookie
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Áp dụng middleware cho tất cả các đường dẫn
};
