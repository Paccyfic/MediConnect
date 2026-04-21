import React,{ReactElement, useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, SafeAreaView, Button, Alert, Platform, StatusBar, Dimensions,TextInput, Pressable,ImageURISource} from 'react-native'
import Typography from '@/constants/Typography';
 import { SvgXml } from "react-native-svg"
import { filter } from '@/assets/icons/Search&FilterIcons/filter';
import { inputSearch } from '@/assets/icons/Search&FilterIcons/inputSearch';
import { leftArrow } from '@/assets/icons/left';
import { router } from 'expo-router';
import { ThemeContext } from '@/ctx/ThemeContext';
import { useContext } from 'react';
import { LeftArrowWhite } from '@/assets/icons/LeftArrowWhite';
import { Logo } from '@/assets/icons/Logo';


interface searchComponentProps{
    onSearchSubmit: (searchTerm: string) => void,
    filterAction?:()=>void
}
function SearchComponent({ onSearchSubmit, filterAction }: searchComponentProps) {
    const { theme, changeTheme } = useContext(ThemeContext)
    const leftArrowIcon = theme === "dark" ? LeftArrowWhite : leftArrow
    const inputStyle = theme === "dark" ? styles.inputDarkStyle : styles.input
    const outerStyle=theme==="dark"?styles.outerDark:styles.outer
    const [value, setValue] = useState("")
    const handleSearchClick = () => {
        onSearchSubmit(value)
    }
    const handleTextChange = (text: string) => {
        setValue(text)
        onSearchSubmit(text)
    }
    return (
        <View style={styles.upperInner}>
             <Pressable style={styles.leftArrowVIew} onPress={()=>router.push("(app)/ActionMenu")}>
                    <SvgXml xml={leftArrowIcon} />
                </Pressable>
        <View style={[styles.outer,outerStyle]}>
            <Pressable style={styles.searchView}  onPress={handleSearchClick}>
                <SvgXml xml={inputSearch} />

            </Pressable>
            <View style={styles.inputView}>
                <TextInput
                    onChangeText={handleTextChange}
                    value={value}
                    style={[styles.input,inputStyle]}
                />
            </View>
            <Pressable style={styles.filterView} onPress={filterAction}>
                <SvgXml xml={filter} />
            </Pressable>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({

    upperInner: {
        width: "100%",
        height:"100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        
    },
    outer: {
        width: "80%",
        height:"100%",
        borderColor: "#F5F5F5",
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius:15    
        
    },
    outerDark: {
        borderWidth:2,
         borderColor: "#246BFD",
        backgroundColor: "#192032",
        
    },
    leftArrowVIew: {
       height: "100%",
        width:"12%",
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    searchView: {
        height: "100%",
        width:"10%",
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
    },
    inputView: {
        width: "70%",
        height: "100%",
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",   
        
    },
    inputDarkStyle: {
        backgroundColor: "#192032",
        color:"white"
    },
    input: {
        width: 200,
        height: 50,
        backgroundColor:"#F5F5F5"    
    },
    filterView: {
        height: "100%",
        width:"10%",
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
       
        
    }
})

export default SearchComponent