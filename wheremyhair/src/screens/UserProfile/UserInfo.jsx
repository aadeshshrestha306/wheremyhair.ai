import { StyleSheet, Text, View, SafeAreaView, TextInput,Dimensions,  StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


const height = StatusBar.currentHeight || 0;
const width = Dimensions.get('screen').width;

const UserInfoScreen = () => {
  const { user, email } = useContext(AuthContext);

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
            />
        <TouchableOpacity style={styles.button}>
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