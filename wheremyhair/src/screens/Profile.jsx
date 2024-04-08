import React, { useContext } from "react";
import {
    Image,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";


const screenWidth = Dimensions.get('screen').width;
const statusBarHeight = StatusBar.currentHeight || 0;

const ProfileView = ( { navigation } ) => {
    const {logOut, user } = useContext(AuthContext);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.semiCircle}>
                <Image
                    defaultSource={require('../assets/images/default.jpg')}
                    resizeMode='cover'
                    source={require('../assets/images/profile.jpg')}
                    style={{
                        width: screenWidth / 4,
                        height: screenWidth / 4,
                        borderRadius: (screenWidth / 4) / 2,
                        justifyContent: 'center',
                        alignItems: 'center' // half of width or height to make it a circle
                    }}
                />
                <TouchableOpacity>
                    <Text style={styles.normal_text2}>Update Photo</Text>
                </TouchableOpacity>
                <Text style={styles.normal_text2}>Hi! 🙏</Text>
                <Text style={styles.normal_text}>{user}</Text>
            </View>
            <TouchableOpacity style={styles.box}>
                <View style={styles.buttons}>
                    <Icon name="reader-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>User Info</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
                <View style={styles.buttons}>
                    <Icon name="analytics-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>Track Progress</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
                <View style={styles.buttons}>
                    <Icon name="chatbox-ellipses-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>Contact Me</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
                <View style={styles.buttons}>
                    <Icon name="close-circle-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>Delete Account</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logOut} style={styles.box}>
                <View style={styles.buttons}>
                    <Icon name="exit-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>Log Out</Text> 
                </View>
            </TouchableOpacity>
            <View style={styles.infobox}>
                <TouchableOpacity>
                    <Icon name="logo-linkedin" size={34} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="logo-github" size={34} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="logo-twitter" size={34} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="logo-discord" size={34} color={'white'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#242219',
    },
    
    semiCircle: {
        margin: statusBarHeight+5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },

    normal_text:{
        fontSize: 16,
        fontFamily: 'Anta-Regular',
        color: 'white',
        alignItems:'center',
        margin: 10,
        textAlign: 'center'
    },

    normal_text2:{
        fontSize: 14,
        fontFamily: 'Anta-Regular',
        color: 'rgba(255, 255, 255, 0.8)',
        alignItems:'center',
        margin: 10,
        textAlign: 'center'
    },

    box: {
        height: screenWidth/6, 
        backgroundColor: 'rgba(64, 59, 42, 0.9)', 
        borderRadius: 8,
        margin: 20,
        marginBottom: 0,
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center'
    },


    infobox: {
        height: screenWidth/6, 
        backgroundColor: 'rgba(64, 59, 42, 0.9)', 
        borderRadius: 8,
        margin: 20,
        marginBottom: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },


    button_text:{
        fontSize: 16,
        fontFamily: 'Kanit-Bold',
        color: 'white',
        alignItems:'center',
        margin: 10,
        textAlign: 'center'
    },

    buttons:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center', 
        margin: 10,
    }
})

export default ProfileView;