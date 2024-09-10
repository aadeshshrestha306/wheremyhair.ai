import { StyleSheet, Text, View, SafeAreaView, TextInput,Dimensions,  StatusBar, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BASE_URL } from '../../../var';


const height = StatusBar.currentHeight || 0;
const width = Dimensions.get('screen').width;

const UserInfoScreen = () => {
  const { user, email } = useContext(AuthContext);
  const [ name, setName ] = useState('')

  useEffect(()=>{
    const getToken = async() => {
      try{
        const session = await EncryptedStorage.setItem("user_session",
          JSON.stringify({
            username: name,
            email: email,
            login_status: true

          })
        );
      }
      catch(error){
        console.error(error);
      }
    };
      getToken();
  }, [])

  const UpdateUsername = async () => {
    try{
      const formdata = {
        'user_email' : email,
        'username' : name
      }
      const response = await axios.put(BASE_URL+"user-update/",
        formdata,
        {
          headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
          }
        }
      )
      console.log(response.data)

      if(response.status == 200){
        Alert.alert("Successful update", "Restart the app to save changes")
      } 
    }
    catch(error){
      if(error.response.status == 400)
      console.log(error);
      Alert.alert("Something went wrong! Please Try Again")
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.font}>Email</Text>
          <TextInput 
            style={styles.textfield}
            placeholder={email}
            editable={false}
            />
        <Text style={styles.font}>Username</Text>
          <TextInput 
            style={styles.textfield}
            placeholder={user}
            onChangeText={ text => setName(text)}
            />
        <TouchableOpacity style={styles.button} onPress={UpdateUsername}>
          <Text style={styles.button_text}>Edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#242219',
    },

    font:{
      fontFamily: 'Kanit-Regular',
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: height*1.5,
      marginLeft: 15,
    },

    textfield:{
      backgroundColor: 'rgba(64, 59, 42, 0.5)',
      margin: 12,
      marginBottom: 10,
      padding: 10,
      borderRadius: 6,
      height: 48,
      color:'rgba(255, 255, 255, 0.7)',
      fontFamily: 'Kanit-Regular',
      fontSize: 16
    },

    button:{
      backgroundColor: 'rgba(64, 59, 42, 0.9)',
      margin: 12,
      marginTop: 40,
      height: 48,
      width: width/2.5,
      borderRadius: 6,
    },
  
    button_text:{
      fontSize: 18,
      fontFamily: 'Kanit-Bold',
      color: 'rgba(255, 255, 255, 0.8)',
      alignItems:'center',
      margin: 10,
      textAlign: 'center'
    },
})


export default UserInfoScreen;