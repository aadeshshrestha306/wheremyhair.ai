import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    const login = async (email: string, password: string) => {
        setUser({email});
    };

    const logout = async () => {
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);