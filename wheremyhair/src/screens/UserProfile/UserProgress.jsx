import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, Alert, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RNFS from 'react-native-fs';
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../../var'

const UserProgressScreen = () => {
  const {email} = useContext(AuthContext)
  const [ imageUrl, setImageUrl ] = useState(null)

  useEffect (() => {
    fetch(BASE_URL+'usage/'+email)
      .then(response => {
        if(response.ok){
          console.log(response)
          return response.blob()
        }
        throw new Error("Network")
      })
      .then(blob => {
        const url = 'data:image/jpg;base64,'+blob;
        setImageUrl(url);
      })
      .catch(error =>{
        console.error(error)
      })
    },  [])

    console.log(imageUrl)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_3}>
        Your Usage Chart
      </Text>
      <View>
      {imageUrl && <Image source={{ uri : imageUrl }} style={{ width: 200, height: 200, margin: 30 }} />}
      </View>
      <Text>
        image
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

    header_3 : {
      textAlign: 'center',
      fontSize: 26,
      fontFamily: 'Anta-Regular',
      color: 'rgba(255,255,255,0.9)',
      margin: 30,
      marginTop: StatusBar.currentHeight || 0,
  },

  content:{
    textAlign: 'justify',
    fontSize: 16,
    fontFamily: 'Kanit-Regular',
    color: 'black',
    margin: 30,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 35,
},
})