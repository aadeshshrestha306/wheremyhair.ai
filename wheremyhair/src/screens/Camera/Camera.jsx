import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, Alert, PermissionsAndroid, Image } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import Icons from 'react-native-vector-icons/Ionicons';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

import axios from "axios";
import { BASE_URL } from "../../../var";

const CameraScreen = ({ navigation }) => {
  const camera = useRef(null);
  const [showCamera, setShowCamera] = useState(true);
  const [imgSource, setImgSource] = useState("");
  const [cameraType, setCameraType] = useState('front')

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const readPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        const writePermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        const cameraPermission = await Camera.getCameraPermissionStatus();
        if (cameraPermission !== 'authorized') {
          await Camera.requestCameraPermission();
        } 
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };

    requestPermissions();
  }, []);

  const frontCamera = useCameraDevice(cameraType);

  const openGallery = async () => {
    try{
      setCameraType(cameraType === 'front' ? 'back' : 'front');
    }
    catch(error){
      Alert.alert("Please select an image!")
    }
  }

  const capturePhoto = async () => {
    if (camera.current !== null){
      try{
        const photo = await camera.current.takePhoto()
        const uri = 'file://'+(photo.path)
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

  const processPhoto = async() => {
    if(imgSource){
      try{
        const formdata = new FormData();
        formdata.append("file", {
          uri: imgSource,
          type: "image/jpeg",
          name: "photo.jpg",
        });

        const response = await axios.post(BASE_URL+"upload-image/",
          formdata,
          {
            headers : {
              "Content-Type" : 'multipart/form-data'
            }
          }
        )

        if (response.data && response.data.prediction){
          const prediction = response.data.prediction
          const confidence = response.data.confidence * 0.1
          const description = response.data.description
          const advice = response.data.advice
          Alert.alert("Successfully processed image!")
          navigation.navigate("Result", { prediction, confidence, description, advice, imgLink: imgSource });
        }
      }
      catch(error){
        console.log(error)
      }
    }else{
      console.log('Error')
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
                <Icons name="sync" color={'white'} size={40} style={styles.gallery_button} />
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
              style={[{ flex: 1 }, cameraType === 'front' && { transform: [{rotate: '90deg'}] }]}
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
            <TouchableOpacity onPress={processPhoto}>
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
    borderWidth: 3,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems:'center'
  },

  gallery_button:{
    marginLeft: -85,
  },  
});

export default CameraScreen;