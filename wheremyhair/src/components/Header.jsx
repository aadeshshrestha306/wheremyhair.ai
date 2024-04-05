import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.header}>
        <Image
            source={require('../assets/images/wheremyhair_logo.png')}
            style={styles.logo}></Image>
        <Text style={styles.text}>wheremyhair.ai</Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
    logo:{
        width: 50,
        height: 50,
    },

    text:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily : 'Kanit-Bold',
        color: 'rgba(255, 255, 255, 0.8)',
    },

    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom: 10,
    },
})