import React, { useContext } from "react";
import {
    Image,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";


const screenWidth = Dimensions.get('screen').width;
const statusBarHeight = StatusBar.currentHeight || 0;

const ProfileView = ( { navigation } ) => {
    const {logOut} = useContext(AuthContext);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.semiCircle}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.infobox}>
                <TouchableOpacity onPress={logOut} style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                    <Icon name="exit-outline" size={32} color={'white'} />
                    <Text>Log Out</Text> 
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
        height: screenWidth/3, 
        backgroundColor: 'rgba(64, 59, 42, 0.9)', 
        marginTop: statusBarHeight,
        borderBottomLeftRadius: screenWidth,
    },

    box: {
        height: screenWidth/3, 
        backgroundColor: 'rgba(64, 59, 42, 0.9)', 
        margin: 20,
        borderRadius: 15
    },

    infobox: {
        height: screenWidth/6, 
        backgroundColor: 'rgba(64, 59, 42, 0.9)', 
        borderRadius: 15,
        margin: 20,
        alignItems: 'center',
    }

})

export default ProfileView;