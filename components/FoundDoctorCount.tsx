import React,{ReactElement, useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, SafeAreaView, Button, Alert, Platform, StatusBar, Dimensions,TextInput, Pressable,ImageURISource} from 'react-native'
import Typography from '@/constants/Typography';
import { SvgXml } from "react-native-svg"
import { defaultIcon } from '@/assets/icons/Defaulticon';
import { ThemeContext } from '@/ctx/ThemeContext';
import { useContext } from 'react';
 
interface foundDoctorProps{
    count: number,
    
}

function FoundDoctorCount({ count }: foundDoctorProps) {
    const foundText = count === 0 ? "0 found" :count===1?"1 found": `${count} founds`
    const { theme, changeTheme } = useContext(ThemeContext)
    const textColor=theme==="dark"?styles.countTextWhite:styles.countText

    return (
        <View style={styles.outer}>
            <View style={styles.leftView}>
                <View style={styles.countView}>
                    <Text style={[styles.countText,textColor]} >{foundText}</Text>

                </View>

            </View>
            <View style={styles.RightView}>
                <View style={styles.defaultView}>
                    <Text style={styles.defaultText}>Default</Text>

                </View>
                <Pressable style={styles.iconView}>
                    <SvgXml xml={defaultIcon} />

                </Pressable>

            </View>
           
        </View>
    );
}

export default FoundDoctorCount;
const styles = StyleSheet.create({
    outer: {
        width: "95%",
        height: 30,
        borderRadius: 10,
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
        
    },
    leftView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
        
    },
    RightView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "24%",  
    },
    countView: {
        
        
    },
    countTextWhite: {
        color:"white"
        
    },
    countText: {
        color: "#212121",
        fontWeight: "bold",
        fontSize:16
        
    },
    foundView: {
        
    },
    foundText: {
        
    },
    defaultView: {
        
    },
    defaultText: {
        color: "#246BFD",
        fontWeight: "bold",
        fontSize:16
        
    },
    iconView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        
    }
    
})