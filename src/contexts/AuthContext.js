import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setTokenAfterLogin = (userData) => {
    const token = userData.token;
    setUser(token);
    // 设置为rememberMe时，存储到localStorage（不过期）
    if (userData.isRemember) {
      localStorage.setItem('user', JSON.stringify(token));
      return;
    }
    // 设置一小时的有效期
    const expire = 1000 * 60 * 60;
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(token))
    }, expire)
  };

  const clearTokenAfterLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
      <AuthContext.Provider value={{ user, setToken: setTokenAfterLogin, clearToken: clearTokenAfterLogout }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

