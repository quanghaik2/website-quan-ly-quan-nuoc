// utils/cookie.js
import { cookies } from 'next/headers'

export const setCookie = async(name, value) => {
    cookies().set({
        name,
        value,
        httpOnly: true,
        path: '/',
      })
};

export const getCookie = (req, name) => {
  const cookies = parse(req.headers?.cookie || '');
  return cookies[name];
};
