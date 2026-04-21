import React,{ReactElement, useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, SafeAreaView, Button, Alert, Platform, StatusBar, Dimensions,TextInput, Pressable,ImageURISource} from 'react-native'
import Typography from '@/constants/Typography';
import { SvgXml } from "react-native-svg"
import { ThemeContext } from '@/ctx/ThemeContext';
import { useContext } from 'react';

function NofoundComponent() {
    const { theme, changeTheme } = useContext(ThemeContext)
    const NotFoundColor = theme === "dark" ? styles.NotFoundWhite : styles.NotFoundText
    const sentenceTextColor=theme==="dark"?styles.sentenceTextWhite:styles.sentenceText
    return (
        <View style={styles.parent}>
        <View style={styles.outer}>
            <View style={styles.imageView}>
                <Image source={require("../assets/images/Doctors/notFound.png") } />

            </View>
            <View style={styles.NotFound}>
                <Text style={[styles.NotFoundText,NotFoundColor]}>Not Found</Text>

            </View>
            <View style={styles.paragraph}>
                <View style={styles.sentenceView}><Text style={[styles.sentenceText,sentenceTextColor]}>Sorry, the keyword you entered can not be</Text></View>
                <View style={styles.sentenceView}><Text style={[styles.sentenceText,sentenceTextColor]}>found, please try again or search with </Text></View>
                <View style={styles.sentenceView}><Text style={[styles.sentenceText,sentenceTextColor]}>another keyword</Text></View>

            </View>

            </View>
            </View>
    );
}

export default NofoundComponent;
const styles = StyleSheet.create({
    parent: {
        width:"95%",
        height:500,
        borderRadius: 10,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor:"black"    
    },

    outer: {
        width: "95%",
        height:"75%",
        borderRadius: 10,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor:"red"   
    },
    imageView: {
        width:"100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
    },
    NotFound: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width:"100%"   
    },
    NotFoundWhite: {
       color:"white" 
    },
    NotFoundText: {
        color: "#212121",
        fontWeight: "bold",
        fontSize:18  
    },
    paragraph: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:"100%"
        
    },
    sentenceView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width:"100%"
        
    },
    sentenceTextWhite: {
       color:"white" 
    },
    sentenceText: {
        color: "#212121",
        fontSize: 16,
        fontWeight:"300"  
    }
})