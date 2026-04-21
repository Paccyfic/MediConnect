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
    time: string;
    message: string,
    timeFrame:string
    
}
function MessageComponent({
  imageSource,
  name,
  timeFrame,
  time,
  message
}: DoctorComponentProps) {
  const {theme, changeTheme} = useContext(ThemeContext)
  return (
    <TouchableOpacity 
          onPress={()=> router.push("History/MessageHistory/Chats")}
          style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between",marginBottom:20,paddingVertical:10}}>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
              <View style={{width: 70, height: 70, borderRadius: 100}}>
              <Image style={{width: "100%", height: "100%", borderRadius: 100}} source={imageSource}/>
              </View>
              <View style={{gap: 10}}>
                <Text style={[Typography.bold.xLarge, {color: theme=== "dark"? "white": "black"}]}>{name}</Text>
                <Text style={[Typography.medium.medium, {color: Colors.grayScale._700}]}>{message}</Text>
              </View>
            </View>
            <View style={{gap: 10}}>
              <Text style={[Typography.medium.medium, {color: Colors.grayScale._700}]}>{timeFrame}</Text>
              <Text style={[Typography.medium.medium, {color: Colors.grayScale._700}]}>{time}</Text>
            </View>
          </TouchableOpacity>
  );
}

export default MessageComponent;