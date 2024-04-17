import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const UserProgressScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        UserProgressScreen
      </Text>
    </SafeAreaView>
  )
}

export default UserProgressScreen

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#242219',
    },
})