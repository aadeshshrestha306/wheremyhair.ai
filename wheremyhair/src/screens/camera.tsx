import React from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, useCameraDevice, useCameraFormat } from "react-native-vision-camera";
import Icons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";

type camProps = NativeStackScreenProps<RootStackParamList, "Camera">;

const CameraScreen: React.FC<camProps> = ({ navigation }: camProps) => {
  const cameraPermission = Camera.getCameraPermissionStatus()
  const newCameraPermission = Camera.requestCameraPermission()

  const frontCamera = useCameraDevice('front')
  const format = useCameraFormat( frontCamera, [
    {videoAspectRatio: 20 / 9},
    {videoResolution: {width: 1080, height: 2400}},
    {fps: 60},
  ])

  if (frontCamera == null) {
    return <ActivityIndicator style={{flex:1}} size={50} color={'red'} ></ActivityIndicator>;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'black'}></StatusBar>
        <View style={styles.header}>
          <TouchableOpacity onPress={ () => navigation.navigate('Home') }>
            <Icons name="caret-back" color={'rgba(255, 255, 255, 0.8)'} size={30} style={{marginTop: 30, marginBottom: 10, marginLeft: 5, paddingHorizontal: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.cameraContainer}>
          <Text style={styles.text}>Upper View</Text>
          <Camera
            style={styles.camera}
            device={frontCamera}
            isActive={true}
            photo={true}
          />
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
    marginBottom: 150
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
});

export default CameraScreen;