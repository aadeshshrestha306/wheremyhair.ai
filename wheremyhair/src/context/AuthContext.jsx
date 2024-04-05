import React, { ReactNode, createContext, useContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={ {user, isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};
