import { StyleSheet, Text, SafeAreaView, Image, ScrollView, View, TouchableOpacity} from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/Ionicons'
import { Axios } from 'axios';

import Header from "../../components/Header";

const ResutlScreen = async({ navigation }) => {
    return(
        <SafeAreaView style={styles.container}>
          < Header/>
            <ScrollView style={styles.container_2}>
                <Text style={styles.header_1}>
                    Your Results
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#242219',
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
export default ResutlScreen;