import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('smit_auth_user', null);

  // لاگ ان فنکشن (مستقبل میں یہاں بیک اینڈ API کی کال لگ جائے گی)
  const login = (role, identifier, password) => {
    const userData = {
      role, // 'student' | 'trainer' | 'admin'
      identifier, // CNIC / Email / Admin ID
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    setCurrentUser(userData);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);