// UserContext.js
// UserContext.js
"use client"
import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext({ 
    role: null,
    username: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ role: null, username: null });

  useEffect(() => {
    const role = Cookies.get('role');
    const username = Cookies.get('username');
    if (role) {
      setUser({ role, username}); // Cập nhật giá trị từ cookies
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
