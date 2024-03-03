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
import { RootStackParamList } from "../App";
import Icons from 'react-native-vector-icons/Ionicons';

type infoProps = NativeStackScreenProps<RootStackParamList, 'Info'>

const InfoScreen = ( { navigation } : infoProps ) => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#242219'}></StatusBar>
            <View style={styles.header}>
                <Text style={styles.text}>"hello world"</Text>
            </View>
            <Icons name="skull" color={'white'} size={100} style={{alignItems: "center", justifyContent:'center', marginLeft: 'auto', marginRight: 'auto'}}/>
            <ScrollView style={styles.container_2}>
                <Text style={styles.content}>This is where about us is featured</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#242219',
    },

    text:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily : 'Kanit-Bold',
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 20,
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
        backgroundColor: '#242219',
    },

    content:{
        textAlign: 'justify',
        fontSize: 14,
        fontFamily: 'Anta-Regular',
        color: 'rgba(255, 255, 255, 0.9)',
        margin: 30,
        lineHeight: 22,
    }

})

export default InfoScreen;