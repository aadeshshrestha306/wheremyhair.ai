import React from "react";
import {
    Image,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import Header from "../components/Header";
import { Icon } from "react-native-vector-icons/Icon";

const HomeScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.container}>
            < Header/>
            <ScrollView style={styles.container_2}>
                <Text style={styles.header_1}>
                    Discover Your Hair's Story with wheremyhair.ai
                </Text>
                <Text style={styles.content}>
                Welcome to wheremyhair.ai, your go-to app for understanding your hair health! Our app helps you determine your baldness severity level with just a few clicks. Simply take a picture of your head top, and our machine learning technology will analyze it to provide you with an accurate assessment. We understand the importance of hair health and aim to make it easy for you to monitor and manage your hair condition. Join us in embracing technology to take control of your hair health journey!
                </Text>
                <Text style={styles.header_1}>
                    Try if for yourself {"\n\n"}Click the camera button
                </Text>
                <Text style={styles.icon}>
                    📷{"\n"}
                </Text>
                <View style={styles.box}> 
                    <Text style={styles.header_3}>
                        How wheremyhair.ai can help you identify your baldness stage
                    </Text>
                    <Text style={styles.content_1}>
                        When you upload a picture of your head top, our app uses a convolutional neural network (CNN) to analyze the image. This CNN has been trained on a dataset of images to recognize patterns associated with different levels of baldness.

                        The app then processes the image and identifies key features related to your hair, such as hair density, scalp visibility, and hair distribution. Based on these features, the app determines your baldness severity level and provides you with an easy-to-understand assessment.

                        We are constantly updating and improving our algorithms to provide you with the most accurate results possible. Our goal is to empower you with the information you need to make informed decisions about your hair health.
                    </Text>
                </View>
                <Text style={styles.header_2}>
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
        fontSize: 16,
        fontFamily: 'Kanit-Regular',
        color: 'black',
        margin: 30,
        marginTop: 10,
        marginBottom: 10,
        lineHeight: 35,
    },

    image:{
        width: 390,
        height: 170,
        resizeMode: 'contain',
    },


    header_1:{
        textAlign: 'center',
        fontSize: 26,
        fontFamily: 'Anta-Regular',
        color: '#242219',
        margin: 30,

    }, 

    header_2 : {
        textAlign: 'justify',
        fontSize: 22,
        fontFamily: 'Anta-Regular',
        color: '#242219',
        margin: 30,
    }, 

    header_3 : {
        textAlign: 'center',
        fontSize: 26,
        fontFamily: 'Anta-Regular',
        color: 'rgba(255,255,255,0.9)',
        margin: 30,
    }, 

    icon : {
        fontSize: 50,
        textAlign: 'center',
        color: 'black'
    },

    box: {
        height: 600, 
        backgroundColor: 'rgb(64, 59, 42)', 
        color: "rgba(255,255,255, 0.9)",
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 0.1,
    },


    content_1:{
        textAlign: 'justify',
        fontSize: 16,
        fontFamily: 'Kanit-Regular',
        color: 'rgba(255, 255, 255, 0.9)',
        margin: 30,
        lineHeight: 35,
        marginTop: 5,
    },
})

export default HomeScreen;