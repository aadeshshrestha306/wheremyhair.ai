import React from "react";
import {
    Image,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RootStackParamList } from "../App";

type camProps = NativeStackScreenProps<RootStackParamList, 'Camera'>

const CameraScreen = ( { navigation } : camProps ) => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#242219'}></StatusBar>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/wheremyhair_logo.png')}
                    style={styles.logo}></Image>
                <Text style={styles.text}>wheremyhair.ai</Text>
            </View>
            <ScrollView style={styles.container_2}>
                <Text style={styles.content}>Hello World</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#242219',
    },
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

    container_2:{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },

    content:{
        textAlign: 'justify',
        fontSize: 14,
        fontFamily: 'Anta-Regular',
        color: 'rgba(0, 0, 0, 0.9)',
        margin: 30,
        lineHeight: 22,
    }

})

export default CameraScreen;