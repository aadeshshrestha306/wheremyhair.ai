import React from "react";
import {
    Image,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import Icons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from "../App";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootStackParamList>()

type homeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: homeProps) => {
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
                <Text style={styles.header_1}>
                    Norwood-Hamilton Scale
                </Text>
                <Image 
                    source={require("../assets/images/norwood-scale.png")}
                    style={styles.image}
                    resizeMode="contain"></Image>
                <Text style={styles.content}>
                The Norwood-Hamilton scale, is a classification system used to assess the progression of male pattern baldness. It was first described by Dr. James Hamilton in the 1950s and later modified by Dr. O'Tar Norwood in the 1970s. The scale consists of seven stages, ranging from minimal to extensive hair loss, with each stage representing a different degree of hair loss and pattern of balding. Stage 1 represents no hair loss, while stage 7 represents the most severe form of baldness, with only a narrow band of hair remaining along the sides and back of the head. The Hamilton-Norwood scale is commonly used by medical professionals to diagnose and classify male pattern baldness, helping to determine the most appropriate treatment options for individuals experiencing hair loss.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

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
        color: '#242219',
        margin: 30,
        marginTop: 20,
        marginBottom: 10,
        lineHeight: 30,
    },

    image:{
        //flex: 1,
        width: 390,
        height: 170,
        resizeMode: 'contain',
    },


    header_1:{
        textAlign: 'justify',
        fontSize: 25,
        fontFamily: 'Anta-Regular',
        color: '#242219',
        margin: 30,
    }
})

export default HomeScreen;