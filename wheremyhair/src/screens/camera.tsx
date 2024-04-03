import React, { useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar, Text, Alert, PermissionsAndroid, Platform, Image, NativeModules } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import Icons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from "react-native-image-picker";

import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";

type camProps = NativeStackScreenProps<RootStackParamList, "Camera">;

const CameraScreen: React.FC<camProps> = ({ navigation }: camProps) => {
  const camera = useRef<Camera>(null)
  const [imgSource, setImgSource] = useState('');
  const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  const cameraPermission = Camera.getCameraPermissionStatus()
  const newCameraPermission = Camera.requestCameraPermission()

  const frontCamera = useCameraDevice('front')

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    setImgSource(result.assets[0].uri); 
    console.log(result);
  }

  const capturePhoto = async () => {
    if (camera.current !== null){
      try{
        const photo = await camera.current.takePhoto()
        setImgSource(photo.path);
        console.log(photo.path);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icons name="caret-back" color={'rgba(255, 255, 255, 0.8)'} size={30} style={{ marginTop: 30, marginBottom: 10, marginLeft: 5, paddingHorizontal: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.cameraContainer}>
        <Text style={styles.text}>Click</Text>
        <Camera
          ref={camera}
          style={styles.camera}
          device={frontCamera}
          isActive={true}
          photo={true}
          enableHighQualityPhotos={true}
        />

        <View style={styles.buttons}>
          <TouchableOpacity onPress={openGallery}>
            <Icons name="images" color={'white'} size={32} style={styles.gallery_button}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.camera_button}
            onPress={() => {
              capturePhoto()
            }}
          >
          </TouchableOpacity>
    
          {imgSource !== '' && (
            <Image
              resizeMode='contain'
              style={styles.image}
              source={{
                uri: `file://${imgSource}`,
              }}
            />
          )}
        </View>
        
      </View>
    </SafeAreaView>
  );
  
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
    marginBottom: 20
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

  header:{
    backgroundColor: 'black'
  },

  buttons:{
     flexDirection: 'row', 
     alignItems: 'center',
     marginBottom: 50,
     justifyContent: 'center'
  },

  camera_button:{
    backgroundColor: 'white',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 5,
    padding: 10,
    borderRadius: 30,
    width: 60,
    height: 60,
  },

  gallery_button:{
    marginLeft: -100,
  },  

  image:{
    marginTop: 20, 
  }
});

export default CameraScreen;