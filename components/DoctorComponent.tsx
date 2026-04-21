import React,{ReactElement, useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, SafeAreaView, Button, Alert, Platform, StatusBar, Dimensions,TextInput, Pressable,ImageURISource} from 'react-native'
import Typography from '@/constants/Typography';
import { SvgXml } from "react-native-svg"
import { ThemeContext } from '@/ctx/ThemeContext';
import { useContext } from 'react';
interface DoctorComponentProps{
    imageSource: {uri:string}
    name: string,
    iconComponent: ReactElement,
    professionalTitle: string,
    hospital: string,
    star: ReactElement,
    rate: string,
    review: number,
    remove?: () => void,
    backgroundStyle?: any,
    path?: () => void,
    addRemoveFavorite?:()=>void
}
function DoctorComponent({ imageSource, name, iconComponent,path,addRemoveFavorite, professionalTitle, hospital, star, rate, review, remove,backgroundStyle }: DoctorComponentProps) {
    const { theme, changeTheme } = useContext(ThemeContext)
    const containerStyle = theme === "dark" ? styles.outerDark : styles.outerLight
    const nameColor = theme === "dark" ? styles.textDark : styles.textLight
    const descriptionColor = theme === "dark" ? styles.descriptionDark : styles.descriptionLight
    const horizontalColor = theme === "dark" ? styles.horizontalDark : styles.horizontalLight
    const handlePress = () => {
        if (remove) {
           remove()
        }else if(addRemoveFavorite){
           addRemoveFavorite() 
       }
   }

    return (
        <Pressable style={[styles.outer,containerStyle,backgroundStyle]} onPress={path}>
            <View style={styles.inner}>
                <View style={styles.profileView}>
                    <Image source={imageSource } style={styles.image} />
                </View>
                <View style={styles.rightView}>
                    <View style={styles.rightViewInner}>
                    <View style={styles.upperRightView}>
                        <View style={styles.nameView}>
                            <Text  style={[Typography.heading._5,nameColor]}   >{ name}</Text>

                        </View>
                        <Pressable style={styles.heartIconView} onPress={handlePress}>
                            { iconComponent}


                        </Pressable>
                    </View>
                    <View style={[styles.horizontal,horizontalColor]}></View>
                    <View style={styles.lowerView}>
                        <View style={styles.professionalView}>
                            <View style={styles.proNameView}>
                                <Text style={[Typography.medium.small, styles.professionalTitle,descriptionColor]}>{ professionalTitle}</Text>


                            </View>
                            <View style={styles.separateView}>

                            </View>
                            <View style={styles.hospitalView}>
                                <Text style={[Typography.medium.small, styles.hospitalText,descriptionColor]}>{ hospital}</Text>

                            </View>
               
                        </View>
                        <View style={styles.reviewView}>
                            <View style={styles.starView}>
                                {star}

                            </View>
                            <View style={styles.rateView}>
                                <Text style={[Typography.medium.small, styles.rateText,descriptionColor]} >{rate}</Text>
                                

                            </View>
                            <View style={styles.allReviewView}>
                                <Text style={[Typography.medium.small, styles.allReviewText,descriptionColor]} >({review} reviews)</Text>
                                

                            </View>
                            

                        </View>

                    </View>
                    </View>

                </View>
           </View>
        </Pressable>
    );
}

export default DoctorComponent;
const styles = StyleSheet.create({
    outer: {
        width: "95%",
        height: "100%",
        borderRadius: 10,
        borderWidth: 1,
        zIndex:1000,
        
    },
    outerDark: {
        backgroundColor: "#1F222A",
        borderColor:"#1F222A"
        
    },
    outerLight: {
        backgroundColor: "white",
        borderColor:"white",
        
    },
    textDark: {
        color:"white"
        
    },
    textLight: {
        
    },
    descriptionDark: {
        color:"#E0E0E0"
    },
    descriptionLight: {
        
    },
    inner: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems:"center",
        height: "100%",
    },
    profileView: {
         width: "35%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems:"center"
    },
    rightView: {
        width: "60%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
        
    },
    rightViewInner: {
       width:"100%" 
    },
    upperRightView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom:"5%"
    },
    nameView: {
        
    },
    professionalTitle: {
        color: "#424242",
        fontWeight: "300",
        fontSize:16
    },
    hospitalText: {
        color: "#424242",
        fontWeight: "300",
        fontSize: 16
    },
    name: {
        color: "#212121",
        fontWeight: "bold",
        fontSize: 18,
        
    },
    heartIconView: {
        
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
    },
    lowerView: {
        
    },
    professionalView: {
       display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        marginBottom: "5%",
    },
    proNameView: {
        
    },
    separateView: {
        height: 15,
        width: 2,
        backgroundColor:"#616161"
    },
    hospitalView: {
        
    },
    horizontal: {
        width: "100%",
        borderWidth: 1,
        marginBottom: "5%",
    },
    horizontalLight: {
        borderColor:"#EEEEEE"
        
    },
    horizontalDark: {
        borderColor:"#35383F"
        
    },
    reviewView: {
       display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width:"80%"
    },
    
    starView: {
        
    },
    rateText: {
      color:"#424242"  
    },
    rateView: {
        
    },
    allReviewText: {
         color:"#424242"
    },
    allReviewView: {
       
    },
    image: {
        width: 110,
        height:110,
        borderRadius: 20
    }
})