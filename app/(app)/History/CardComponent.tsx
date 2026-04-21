import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import React, { ReactElement, useContext } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { ImageURISource, View } from "react-native";

interface DoctorComponentProps {
  imageSource: ImageURISource | number;
  name: string;
  iconComponent: ReactElement;
  method: string;
  day: string;
  time: string;
  handle?: () => void;
}
function DoctorComponent({
  imageSource,
  name,
  iconComponent,
  method,
  day,
  time,
  handle
}: DoctorComponentProps) {
  const {theme, changeTheme} = useContext(ThemeContext)


  return (
    <TouchableOpacity
    onPress={handle}
      style={{
        borderRadius: 10,
        borderColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",    
        backgroundColor: theme ==="dark"? Colors.dark._1 : Colors.others.white,    
        padding: 20,
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 3,
          shadowRadius: 2,
          elevation: 10,
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
          <Text style={[Typography.bold.large, {color: theme ==="dark"? Colors.others.white: "black"}]}>{name}</Text>
          <Text style={{color: Colors.grayScale._700}}>{method}</Text>
          <Text style={{color: Colors.grayScale._700}}>
            {day}  |  {time}
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: Colors.transparent.blue, padding: 20, borderRadius: 100}}>{iconComponent}</View>
    </TouchableOpacity>
  );
}

export default DoctorComponent;
