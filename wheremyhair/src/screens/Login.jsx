import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo';
import { Screen } from 'react-native-screens';

const LoginScreen = ( { navigation }) =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useContext(AuthContext);

  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.text}>Sign In to wheremyhair.ai</Text>
        <Text style={styles.font}>Email</Text>
        <TextInput 
          style={styles.textfield}
          value={email}
          onChangeText={text => setEmail(text)}
          />
        <Text style={styles.font}>Password</Text>
        <TextInput 
          style={styles.textfield}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          />
        <Pressable style={styles.button} onPress={ () => navigation.navigate('Main', {Screen: 'HomeScreen'})}>
          <Text style={styles.button_text}>Log In</Text>
        </Pressable>
        <TouchableOpacity onPress={ () => Alert.alert("Redirecting")}>
          <Text style={styles.options}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent:'center', marginTop:8}}>
          <Text style={styles.options_2}>Dont have an account?</Text>
          <TouchableOpacity onPress={ () => navigation.navigate('Signup')}>
            <Text 
              style={{
                fontFamily: 'Kanit-Regular',
                color: 'rgba(255, 255, 255, 0.8)',
                alignItems:'center',
                textAlign: 'center',
                textDecorationLine: 'underline'}}>Create one!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1, 
      backgroundColor: '#242219',
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
    color: 'rgba(255, 255, 255, 0.8)',
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
    textAlign: 'center',
  },

  options_2:{
    fontFamily: 'Kanit-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    alignItems:'center',
    textAlign: 'center',
    marginRight:3,
  }
});

export default LoginScreen;
