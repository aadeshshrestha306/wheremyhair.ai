import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SplashScreen = ({navigation}) =>  {
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/wheremyhair_logo.png')}
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

export default SplashScreen;
