import React,{ReactElement, useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, SafeAreaView, Button, Alert, Platform, StatusBar, Dimensions,TextInput, Pressable,ImageURISource} from 'react-native'
import Typography from '@/constants/Typography';
import { SvgXml } from "react-native-svg"

interface RemovebtnProps{
    text: string,
    action: () => void,
    backColor: string,
    textColor:string


}

function Removebtn({text,action,backColor,textColor}:RemovebtnProps) {
    return (
        <Pressable onPress={ action} style={[styles.outer, { backgroundColor:backColor }]}>
            <Text style={[styles.textSize, { color: textColor }]}>{text }</Text>

        </Pressable>
    );
}

export default Removebtn;

const styles = StyleSheet.create({
    outer: {
        width:"45%",
        height: 50,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center"
    },
    textSize: {
        fontSize:16
    }
})