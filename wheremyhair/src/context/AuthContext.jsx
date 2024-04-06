import React, { ReactNode, createContext, useContext, useState } from 'react';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/Config';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async(email, password) => {
    try{
      const formdata = new FormData();
      formdata.append('username', email);
      formdata.append('password', password);

      const response = axios.post("http://192.168.1.11:8000/user-login/", formdata);

      if (response.status == 200){
        setUser(email);
        console.log(user)
        AsyncStorage.setItem('user', email)
        setIsLoggedIn(true);
        Alert.alert("Successful Login!")
      }
    }
    catch(error){
      Alert.alert("An error occured. Please try again!")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login}}>
      {children}
    </AuthContext.Provider>
  );
};
