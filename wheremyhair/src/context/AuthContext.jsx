import React, { createContext, useState, useEffect} from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

import { BASE_URL } from '../../var';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ status, setStatus ] = useState(Boolean);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await EncryptedStorage.getItem("user_session");
        if (session !== undefined && session !== null) {
          const obj = JSON.parse(session);
          if (obj && obj.login_status !== undefined && obj.login_status !== null) {
            setStatus(true);
          } else {
            setStatus(false); 
          }
        } else {
          setStatus(false); 
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        setStatus(false);
      }
    };
  
    fetchData();
  }, []);

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
        }
      );
  
      if (response.data && response.data.access_token){
        const token = response.data.access_token
        await EncryptedStorage.setItem(
          "user_session",
          JSON.stringify({
            username: email,
            token: response.data.access_token,
            login_status: true
          })
        );
      setStatus(true);
      setUser(email);
      }
      else{
        Alert.alert("Please enter a valid email or password!")
      }
    }
    catch(error){
      Alert.alert("An error occured. Please try again!")
    }
  }

  const logOut = async() => {
    await EncryptedStorage.removeItem("user_session",);
    await EncryptedStorage.clear();
    setStatus(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, status, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
