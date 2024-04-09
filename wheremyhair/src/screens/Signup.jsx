import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage'

import Logo from '../components/Logo';
import { BASE_URL } from '../services/Config';

const SignupScreen = ( { navigation }) =>  {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ verificatiionCode, setVerificationCode ] = useState('')


  const handleVerification = async () => {
    try{
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!emailPattern.test(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return; 
      }  

      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

      if (!passwordPattern.test(password)) {
        Alert.alert(
          "Invalid Password",
          "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter."
        );
        return;
      }

      const formdata = {
        'email': email
      }

      const response = await axios.post(BASE_URL+"send-verification-code/",
        formdata,
        {
          headers:{
            "Content-Type": 'application/x-www-form-urlencoded'
          }        
        }
      );

      if (response.data && response.data.code){
        await EncryptedStorage.setItem(
          "user_code",
          JSON.stringify({
            code: response.data.code 
          })
        )
      }
      setModalVisible(true)
    }
    catch(error){
      Alert.alert("An error occured. Please try again!")
    }

  }

  const handleSignUp = async() => {
    code = await EncryptedStorage.getItem("user_code")
    if (code!== undefined && code !== null){
      const obj = JSON.parse(code)
      if(obj && obj.code !== undefined && obj.code == verificatiionCode){
        try{
          const response = await axios.post(BASE_URL+"sign-up/",{
            user_verification:{
              email: email,
              verification_code: obj.code
            },
            user: {
              email: email,
              username: username,
              password: password,
            }
          });

          if(response.status==200){
            Alert.alert("Successfuly Registered!")
          }
        }
        catch(error){
          console.log(error)
        }
      }    
    }
    setModalVisible(false)    
  }

  return(
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <Logo />
            <Modal 
              visible={modalVisible}
              animationType='slide'
              onRequestClose={() =>{
                setModalVisible(!modalVisible);
              }}
              transparent={true}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <TextInput
                    style={styles.textfield}
                    value={verificatiionCode}
                    onChangeText={text => setVerificationCode(text)}
                  />
                  <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
                    <Text style={styles.button_text}>Verify</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text style={styles.text}>Sign Up for wheremyhair.ai</Text>
            <Text style={styles.font}>Email</Text>
            <TextInput 
              style={styles.textfield}
              value={email}
              onChangeText={text => setEmail(text)}
              />
            <Text style={styles.font}>Username</Text>
            <TextInput 
              style={styles.textfield}
              value={username}
              onChangeText={text => setUsername(text)}
              />
            <Text style={styles.font}>Password</Text>
            <TextInput 
              style={styles.textfield}
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              />
            <TouchableOpacity style={styles.button} onPress={ () => handleVerification()}>
              <Text style={styles.button_text}>Create Account</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1, 
      backgroundColor: '#242219',
  },

  logo:{
    width: 60,
    height: 60,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignContent: 'center'
  },

  text:{
      textAlign: 'center',
      fontSize: 24,
      fontFamily : 'Kanit-Bold',
      marginTop: 2,
      marginBottom: 10,
      color: 'rgba(255, 255, 255, 0.8)',
  },

  font:{
    fontFamily: 'Kanit-Regular',
    color: '#ffffff',
    marginTop: 20,
    marginLeft: 15,
  },

  textfield:{
    backgroundColor: 'rgba(64, 59, 42, 0.5)',
    margin: 12,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
    height: 48,
    color:'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Kanit-Regular',
    fontSize: 16
  },

  button:{
    backgroundColor: 'rgba(64, 59, 42, 0.9)',
    margin: 12,
    marginTop: 40,
    height: 48,
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

  options:{
    fontFamily: 'Kanit-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    alignItems:'center',
    margin: 8,
    textAlign: 'center'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    backgroundColor: '#242219',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: Dimensions.get('window').width/1.5,
  },
});

export default SignupScreen;
