import { MoreIcon } from "@/assets/icons/MoreCircleSvg";
import {
  backArrowBlack,
  backArrowWhite,
} from "@/components/UI/icons/backArrow";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { ImageBackground, Pressable, Text, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import DoctorComponent from "../CardComponent";
import { BlueRightIconWithBg } from "@/components/UI/icons/rigthIcon";
import HistoryMenu from "../HistoryMenu";
import { VideoCallWhiteIcon } from "@/components/Icons/Icons";
import { bluePlayBtn, playBtnWhiteIcon } from "@/components/UI/icons/playBtn";
import { BlueVideoCall } from "@/components/UI/icons/videoCallIcon";
import { ThemeContext } from "@/ctx/ThemeContext";
import { moreWhiteIcon } from "@/components/UI/icons/circleWithDots";


const Ddata = {
    id: "1",
    image: require("@/assets/images/Dr maria.png"),
    method: "video call",
    name: "dr Drake",
    message: "my pleasure all the best for your carrier life",
    day: "Today",
    time: "10:00 AM",
  };

const IndividualCall = () => {
  const {theme, changeTheme} = useContext(ThemeContext)
const [menu, setMenu] = useState(false)

const handleMenu =()=> {
  setMenu(!menu)
}

return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark"? Colors.dark._1:  Colors.others.white,
        flexDirection: "column",
        padding: 20,
        position: "relative"
      }}
    >
      <StatusBar style="dark" />
      <View style={{ paddingTop: 20, gap: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <SvgXml xml={theme === "dark"? backArrowWhite : backArrowBlack} />
          </Pressable>
          <TouchableOpacity onPress={handleMenu}>
            <SvgXml xml={ theme ==="dark" ? moreWhiteIcon : MoreIcon} />
          </TouchableOpacity>
        </View>
        {menu && (
          <View
            style={[
              {
                position: "absolute",
                right: 20,
                top: 50,
                zIndex: 1
              },
            ]}
          >
            <HistoryMenu closeMenu={handleMenu} method="Video"/>
          </View>
        )}
        <View>
          <DoctorComponent
            imageSource={Ddata.image}
            name={Ddata.name}
            iconComponent={<SvgXml xml={BlueVideoCall} />}
            method={Ddata.method}
            day={Ddata.day}
            time={Ddata.time}
          />
        </View>
        <Text style={{color: theme=== "dark"? "white" :"black"}}
        >30 minutes of video calls have been recorded.</Text>
          <Pressable
            onPress={() =>router.push("History/VideoCallHistory/VideoPlayer")}
            style={{flexDirection: "row",gap: 20,alignItems: "center", justifyContent: "center", backgroundColor: Colors.main.primary._500, borderRadius: 100. }}>
            <View style={{padding: 20}}>
              <SvgXml xml={playBtnWhiteIcon}/>
            </View>
            <Text style={[Typography.bold.large,{color: Colors.others.white}]}>Play audio recording</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default IndividualCall;
