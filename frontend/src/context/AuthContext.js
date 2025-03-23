import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user will be { email, token } or null

  const login = (userData) => {
    setUser(userData); // store user info
  };

  const logout = () => {
    setUser(null); // clear on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to access auth anywhere
export const useAuth = () => useContext(AuthContext);

