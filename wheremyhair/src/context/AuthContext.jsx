import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

import { BASE_URL } from '../utils/Config';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("")

  const logIn = async({email, password}) => {
    try{
      const formdata = {
      'grant_type': '',
      'username': email,
      'password': password,
      'scope': '',
      'client_id': '',
      'client_secret': ''}

      const response = await axios.post(BASE_URL+"user-login/", 
        formdata,
        {
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        });
  
      if (response.data && response.data.access_token){
        setUser(email);
        setIsLoggedIn(true);
        setToken(response.data.access_token);
        await EncryptedStorage.setItem(
          "user_session",
          JSON.stringify({
            username: user,
            token: token,
            status: isLoggedIn
          })
        );
        const session = await EncryptedStorage.getItem("user_session");

        if (session !== undefined){
          const obj = JSON.parse(session);
          const status = obj.status
          console.log("Stored Value", status);
        } 
      }
    }
    catch(error){
      Alert.alert("An error occured. Please try again!")
    }
  }

  const logOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
