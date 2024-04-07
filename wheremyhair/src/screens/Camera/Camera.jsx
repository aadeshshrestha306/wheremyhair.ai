import React, { useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, Alert, PermissionsAndroid, Dimensions, Image, Text } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import Icons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from "react-native-image-picker";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Icon from "react-native-vector-icons/Ionicons";


const CameraScreen = ({ navigation }) => {
  const camera = useRef(null);
  const [showCamera, setShowCamera] = useState(true);
  const [imgSource, setImgSource] = useState("");
  const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  const writepermission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const cameraPermission = Camera.getCameraPermissionStatus();
  const newCameraPermission = Camera.requestCameraPermission();

  const frontCamera = useCameraDevice('front');

  const openGallery = async () => {
    try{
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (!result.didCancel && !result.errorCode) {
        setImgSource(result.assets[0].uri)
        console.log(imgSource);
        setShowCamera(false);
      } 
    }
    catch(error){
      Alert.alert("Please select an image!")
    }
  }

  const capturePhoto = async () => {
    if (camera.current !== null){
      try{
        const photo = await camera.current.takePhoto()
        const uri = 'file://'+photo.path
        setImgSource(uri);
        await CameraRoll.saveAsset(imgSource ,{
          type:'photo',
          album: 'wheremyhair',
        })
        console.log(imgSource);
        setShowCamera(false);
      }
      catch(error){
        console.error(error);
        Alert.alert("An error occured while taking photo.   Please try again!")
      }
    }
  }

  if (frontCamera == null) {
    return <ActivityIndicator style={{flex:1}} size={50} color={'red'} ></ActivityIndicator>;
  }
  
    return (
      <SafeAreaView style={styles.container}>
        {showCamera ? (
            <>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icons name="caret-back" color={'rgba(255, 255, 255, 0.8)'} size={30} style={{ marginTop: 50, marginLeft: 5, marginBottom: 30, paddingHorizontal: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.cameraContainer}>
              <Camera
                ref={camera}
                style={{flex: 1}}
                device={frontCamera}
                isActive={true}
                photo={true}
                enableHighQualityPhotos={true}
                orientation="portrait"
              />
              <View style={styles.buttons}>
                <TouchableOpacity onPress={openGallery}>
                  <Icons name="images" color={'white'} size={32} style={styles.gallery_button} />
                </TouchableOpacity>
                <TouchableOpacity onPress={capturePhoto}>
                  <View style={styles.camera_ring}>
                    <View style={styles.camera_button}></View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
          ):(
            <>
            {imgSource !== '' && (
              <Image
                resizeMode='contain'
                orientation='landscape'
                source={{
                  uri: imgSource
                }}
                style={{ flex: 1, transform: [{rotate: '90deg'}] }}
              />
            )}
            <View style={{
              flexDirection: 'row', 
              alignItems: 'center',
              marginBottom: 100,
              justifyContent: 'center',
            }}>
              <TouchableOpacity onPress={() => setShowCamera(true)}>
                <Icons name="refresh-circle" color={'white'} size={60}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icons name="checkmark-circle" color={'white'} size={60}/>
              </TouchableOpacity>
            </View>
            </>
          )}
      </SafeAreaView>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  cameraContainer: {
    flex: 1,
    marginBottom: 50,
    backgroundColor: 'black'
  },

  text:{
    textAlign: 'center',
    fontSize: 20,
    fontFamily : 'Kanit-Bold',
    color: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },

  buttons:{
     flexDirection: 'row', 
     alignItems: 'center',
     margin: 20,
     justifyContent: 'center',
  },

  camera_button:{
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    width: 50,
    height: 50,
  },

  camera_ring:{
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems:'center'
  },

  gallery_button:{
    marginLeft: -100,
  },  
});

export default CameraScreen;