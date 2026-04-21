import React,{ReactElement, useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, SafeAreaView, Button, Alert, Platform, StatusBar, Dimensions,TextInput, Pressable,ImageURISource} from 'react-native'
import Typography from '@/constants/Typography';
import { SvgXml } from "react-native-svg"
import { whiteStar } from '@/assets/icons/whiteStar';
import { blueStar } from '@/assets/icons/blueStar';
interface RatebtnProps{
    text: string,
    isSelected: boolean,
    selectedAction:()=>void
}


function Ratebtn({text,isSelected,selectedAction}:RatebtnProps) {
    return (
        <Pressable style={[styles.btn,isSelected?styles.selectedbtn:{}]} onPress={selectedAction}>
            <View style={styles.btnInnerView}>
                <View style={styles.iconView}>
                    <SvgXml xml={isSelected?whiteStar:blueStar} />
                </View>
                <View style={styles.rateTextView}><Text style={[styles.rateText,isSelected?styles.selectedText:{}]}>{text}</Text></View>
            </View>
            
        </Pressable>
    );
}

export default Ratebtn;

const styles = StyleSheet.create({
    categoryBtn: {
        borderWidth: 2,
        borderColor: "#246BFD",
        height: 40,
        paddingHorizontal: 20,
        paddingVertical:7,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginLeft:10
    },
    btn: {
        height: 40,
        width:70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 2,
        borderWidth: 2,
        borderColor: "#246BFD",
         marginRight: 8,
        marginLeft: 10,
        borderRadius:20
        
    },
    selectedbtn: {
        height: 40,
        width:70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 2,
       backgroundColor: "#246BFD",
        borderWidth: 2,
        borderColor: "#246BFD",
         marginRight: 8,
        marginLeft: 10,
        borderRadius:20
        
    },
    selectedText: {
        color:"white"

    },
    titleView: {
        
    },
    rateView: {

        
    },
    btnInnerView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "60%",
    },
    iconView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        
    },
    rateTextView: {
        
    },
    rateText: {
        color:"#246BFD"
        
    },
    title: {
        color: "#212121",
        fontWeight: "bold",
        fontSize: 18
        
    },
    scrollView: {
        
    },
    specialityView: {
        
    },
    displayComponent: {
        
    },
    btnView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    
    categoryScroll: {
    
    }
})