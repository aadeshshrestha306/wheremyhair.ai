import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <Image
        source={require('../assets/images/wheremyhair_logo.png')}
        style={styles.logo}></Image>
  )
}

export default Logo;

const styles = StyleSheet.create({
  logo:{
    width: 60,
    height: 60,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignContent: 'center'
  },
})