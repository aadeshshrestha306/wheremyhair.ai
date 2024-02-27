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

type homeProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>

const Home = ( { navigation } : homeProps ) => {
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
                <Text style={styles.content}>
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.                </Text>
                <Text style={styles.content}>
                    Where does it come from?
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                </Text>
                <Text style={styles.content}>
                    Why do we use it?
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </Text>
                <Text style={styles.content}>
                    Where can I get some?
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
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

export default Home;