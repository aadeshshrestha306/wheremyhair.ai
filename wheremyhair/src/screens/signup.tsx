import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


import { RootStackParamList } from '../App';


type signupProps = NativeStackScreenProps<RootStackParamList, 'SignupScreen'>

const Signup = ( { navigation }: signupProps) =>  {
  return(
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <StatusBar backgroundColor={'#242219'}></StatusBar>
            <Image
              source={require('../assets/images/wheremyhair_logo.png')}
              style={styles.logo}></Image>
            <Text style={styles.text}>Sign Up for wheremyhair.ai</Text>
            <Text style={styles.font}>Email</Text>
            <TextInput 
              style={styles.textfield}
              />
            <Text style={styles.font}>Username</Text>
            <TextInput 
              style={styles.textfield}
              />
            <Text style={styles.font}>Password</Text>
            <TextInput 
              style={styles.textfield}
              />
            <Pressable style={styles.button} onPress={ () => Alert.alert("Log in!")}>
              <Text style={styles.button_text}>Create Account</Text>
            </Pressable>
            <TouchableOpacity onPress={ () => navigation.push('LoginScreen')}>
              <Text style={styles.options}>Already have one? Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => Alert.alert("Redirecting")}>
              <Text style={styles.options}>Click to follow wheremyhair.ai for updates</Text>
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
    color:'rgba(255, 255, 255, 0.8)'
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
  }
});

export default Signup;
