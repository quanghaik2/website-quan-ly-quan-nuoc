// src/middlewares/middleware.js
import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export function middleware(req) {
  const cookies = parse(req.headers.get('cookie') || '');
  const token = cookies.authToken;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|api|_next/static|favicon.ico).*)'],
};
