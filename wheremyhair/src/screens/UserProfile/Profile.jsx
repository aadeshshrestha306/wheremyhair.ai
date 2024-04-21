import React, { useContext, useState } from "react";
import {
    Image,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking,
    Modal,
    Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../context/AuthContext";


const screenWidth = Dimensions.get('screen').width;
const statusBarHeight = StatusBar.currentHeight || 0;

const ProfileView = ( { navigation } ) => {
    const {logOut, email, user } = useContext(AuthContext);
    const [ modalVisible, setModalVisible ] = useState(false);

    const openLinkedIn = () => {
        Linking.openURL("https://www.linkedin.com/in/aadesh-shrestha-aerosol");
      };
    
      const openGitHub = () => {
        Linking.openURL("https://github.com/aadeshshrestha306");
      };
    
      const openTwitter = () => {
        Linking.openURL("https://twitter.com/aadesh_21");
      };
    
      const openMail = () => {
        Linking.openURL("mailto:bigelonmuskfan@gmail.com");
      };

    return(
        <SafeAreaView style={styles.container}>
            <Modal
                    visible={modalVisible}
                    animationType='slide'
                    onRequestClose={() =>{
                      setModalVisible(!modalVisible);
                    }}
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                        <Text style={styles.font}>Are you sure you want to log out?</Text>
                        <TouchableOpacity style={styles.textfield} onPress={logOut}>
                            <Text style={styles.button_text}>Log Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textfield} onPress={() => setModalVisible(false)}>
                            <Text style={styles.button_text}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
            <View style={styles.semiCircle}>
                <Image
                    defaultSource={require('../../assets/images/default.jpg')}
                    resizeMode='cover'
                    source={require('../../assets/images/profile.jpg')}
                    style={{
                        width: screenWidth / 4,
                        height: screenWidth / 4,
                        borderRadius: (screenWidth / 4) / 2,
                        justifyContent: 'center',
                        alignItems: 'center' 
                    }}
                />
                <Text style={styles.normal_text2}>Hi 🙏</Text>
                <Text style={styles.normal_text}>{user}</Text>
            </View>
            <TouchableOpacity style={styles.box} onPress={ () => navigation.navigate('UserInfo')}>
                <View style={styles.buttons}>
                    <Icon name="reader-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>User Info</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={ () => navigation.navigate('UserProgress')}>
                <View style={styles.buttons}>
                    <Icon name="analytics-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>Track Progress</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={openMail}>
                <View style={styles.buttons}>
                    <Icon name="mail-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>Contact Us</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.box}>
                <View style={styles.buttons}>
                    <Icon name="exit-outline" size={30} color={'white'} />
                    <Text style={styles.button_text}>Log Out</Text> 
                </View>
            </TouchableOpacity>
            <View style={styles.infobox}>
                <TouchableOpacity onPress={openLinkedIn}>
                    <Icon name="logo-linkedin" size={34} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openGitHub}>
                    <Icon name="logo-github" size={34} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openTwitter}>
                    <Icon name="logo-twitter" size={34} color={'white'} />
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
        color: 'rgba(255, 255, 255, 0.6)',
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
    },

    font:{
        fontFamily: 'Kanit-Regular',
        color: '#ffffff',
        marginTop: 20,
        marginLeft: 15,
        fontSize: 19,
        textAlign: 'center'
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },

    modalView: {
        backgroundColor: '#242219',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: Dimensions.get('window').width/1.5,
      },

      textfield:{
        backgroundColor: 'rgba(64, 59, 42, 0.5)',
        margin: 12,
        borderRadius: 6,
        height: 48,
        color:'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Kanit-Regular',
        fontSize: 16,
        justifyContent:'center',
        alignItems: 'center'
      },

      button_text:{
        fontSize: 18,
        fontFamily: 'Kanit-Bold',
        color: 'rgba(255, 255, 255, 0.8)',
        alignItems:'center',
        margin: 10,
        textAlign: 'center'
      },
    
    
})

export default ProfileView;