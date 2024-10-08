import { StyleSheet, Text, SafeAreaView, Image, ScrollView, View, TouchableOpacity} from 'react-native'
import React from 'react'
import Header from "../../components/Header";

const ResultScreen = ({ route }) => {
    const { prediction, confidence, description, advice, imgLink } = route.params;
    const roundedConfidence = parseFloat(confidence).toFixed(2);

    return(
        <SafeAreaView style={styles.container}>
          < Header/>
            <ScrollView style={styles.container_2}>
                <Text style={styles.header_1}>
                    Your results are here
                </Text>
                <Text style={styles.header_2}>
                    Severity Level - {prediction}
                </Text>
                <Text style={styles.content}>
                    {description}
                </Text>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Image
                        resizeMode='contain'
                        orientation='landscape'
                        source={{
                            uri: imgLink
                        }}
                        style={{ flex: 1, transform: [{rotate: '90deg'}], width: 200, height: 200}}
                    />
                </View>
                <Text style={styles.header_1}>
                    Personalized Advice for You
                </Text>
                <Text style={styles.content}>
                    {advice}
                </Text>
                <Text style={styles.options_2}>
                        -powered with claude.ai
                    </Text>
                <Text style={styles.header_1}>
                    Help Us Improve!
                </Text>
                <Text style={styles.header_2}>
                    Confidence Score - {roundedConfidence}/10
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
        fontSize: 15,
        fontFamily: 'Anta-Regular',
        color: '#242219',
        margin: 30,
        marginTop: 0,
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
        marginBottom: 10,
    },

    header_2:{
        textAlign: 'justify',
        fontSize: 21,
        fontFamily: 'Anta-Regular',
        color: '#242219',
        margin: 30,
        marginBottom: 10
    },

    options_2:{
        fontFamily: 'Kanit-Regular',
        color: 'rgba(36, 34, 25, 0.6)',
        alignItems:'center',
        textAlign: 'center',
      }
})
export default ResultScreen;