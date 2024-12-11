import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider ({children}) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserToken = localStorage.getItem('userToken');
    const storedUserId = localStorage.getItem('userId');
    if (storedUserToken) {
      setToken(JSON.parse(storedUserToken));
    }
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    }
  }, []);

  const setTokenAfterLogin = (userData) => {
    const token = userData.token;
    const id = userData.id;
    setToken(token);
    setUserId(id);
    // 设置为rememberMe时，存储到localStorage（不过期）
    if (userData.isRemember) {
      localStorage.setItem('userToken', JSON.stringify(token));
      localStorage.setItem('userId', JSON.stringify(id));
      return;
    }
    // 设置一小时的有效期
    const expire = Date.now() + 1000 * 60 * 60; // 1 hour from now
    localStorage.setItem('userToken', JSON.stringify(token), {expires: expire});
    localStorage.setItem('userId', JSON.stringify(id), {expires: expire});
  };

  const clearTokenAfterLogout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{
      user: token,
      userId,
      setToken: setTokenAfterLogin,
      clearToken: clearTokenAfterLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth () {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

