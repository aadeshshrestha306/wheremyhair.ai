import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App = () =>  {
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#242219'}></StatusBar>
        <Image
        source={require('./src/assets/images/wheremyhair_logo.png')}
        style={styles.logo}></Image>
        <Text style={styles.logo_text}>wheremyhair.ai</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242219',
  },

  logo:{
    width: 100,
    height: 100
  },

  logo_text:{
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
    marginTop: 2,
    color:'#ffffff',
  },
});

export default App;
