import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import React, { ReactElement, useContext } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { ImageURISource, View } from "react-native";
import { router } from "expo-router";
import { ThemeContext } from "@/ctx/ThemeContext";
interface DoctorComponentProps {
  imageSource: ImageURISource | number;
  name: string;
  iconComponent?: ReactElement;
  method: string;
  day: string;
  time: string;  
  onPress: ()=> void

}
function DoctorComponentVoice({
  imageSource,
  iconComponent,
  name,
  method,
  day,
  time,
  onPress
}: DoctorComponentProps) {
  const {theme, changeTheme} = useContext(ThemeContext)
  return (
      <TouchableOpacity
          onPress={onPress}
      style={{
        borderRadius: 10,
        borderColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",    
        backgroundColor: theme === "dark"? Colors.dark._2: Colors.others.white,  
        padding: 20,
        shadowColor: "#cfcfcf",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 3,
        shadowRadius: 2,
        elevation: 10,
        marginBottom: 5,
        marginTop:5
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 30,
        }}
      >
        <View style={{height: 100, width: 100,borderRadius: 10}}>
          <Image style={{width: "100%", height: "100%",borderRadius: 10}} source={imageSource} />
        </View>
        <View style={{ gap: 10, alignItems: "flex-start" }}>
          <Text style={[Typography.bold.large, {color: theme === "dark" ? Colors.others.white: "black"}]}>{name}</Text>
          <Text style={{color: theme === "dark" ? Colors.others.white: "black"}}>{method}</Text>
          <Text style={{color: theme === "dark" ? Colors.others.white: "black"}}>{day} | {time}</Text>
        </View>
      </View>
          <View style={{
            padding: 20,
            backgroundColor: Colors.transparent.blue,
            borderRadius: 100
      }}>{iconComponent}</View>
    </TouchableOpacity>
  );
}

function DoctorComponentVideo({
  imageSource,
  iconComponent,
  name,
  method,
  day,
  time,
  onPress

}: DoctorComponentProps) {
  const {theme, changeTheme} = useContext(ThemeContext)
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        borderRadius: 10,
        borderColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",    
        backgroundColor: theme==="dark"? Colors.dark._1:  Colors.others.white,    
        padding: 20,
        shadowColor: "#cfcfcf",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 3,
        shadowRadius: 2,
        elevation: 10,
         marginBottom: 5,
        marginTop:5
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 30,
        }}
      >
        <View style={{height: 100, width: 100,borderRadius: 10}}>
          <Image style={{width: "100%", height: "100%",borderRadius: 10}} source={imageSource} />
        </View>
        <View style={{ gap: 10, alignItems: "flex-start" }}>
          <Text style={[Typography.bold.large, {color: theme==="dark"? Colors.others.white: Colors.others.black}]}>{name}</Text>
          <Text style={{color: theme === "dark" ? Colors.grayScale._700: Colors.others.black}}>{method}</Text>
          <Text style={{color: theme === "dark" ? Colors.grayScale._700: Colors.others.black}}>
            {day} |  
            {time}
          </Text>
        </View>
      </View>
          <View style={{
       padding: 20,
       backgroundColor: Colors.transparent.blue,
       borderRadius: 100
          }}>{iconComponent}</View>
    </TouchableOpacity>
  );
}
export {DoctorComponentVoice,DoctorComponentVideo}