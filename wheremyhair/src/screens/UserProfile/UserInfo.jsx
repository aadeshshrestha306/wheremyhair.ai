import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const UserInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        UserInfo
      </Text>
    </SafeAreaView>
  )
}

export default UserInfoScreen

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#242219',
    },
})