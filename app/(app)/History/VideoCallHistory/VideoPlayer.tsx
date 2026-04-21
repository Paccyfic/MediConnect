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
import {
  ImageBackground,
  Pressable,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import DoctorComponent from "../CardComponent";
import { BlueRightIconWithBg } from "@/components/UI/icons/rigthIcon";
import HistoryMenu from "../HistoryMenu";
import { audioPlayHistoryIcon } from "@/components/UI/icons/audioWave";
import { ThemeContext } from "@/ctx/ThemeContext";

const Ddata = {
  id: "1",
  image: require("@/assets/images/Dr maria.png"),
  method: "video call",
  name: "dr Drake",
  message: "my pleasure all the best for your carrier life",
  day: "Today",
  time: "10:00 AM",
};

const VideoPlayer = () => {
  const {theme, changeTheme} = useContext(ThemeContext)
  const [menu, setMenu] = useState(false);
  const [playBtn, setPlayBtn] = useState(false);

  const handlePlayAudio = () => {
    setPlayBtn(!playBtn);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/videoCallHistoryBgImage.png")}
      style={{
        flex: 1,
      }}
    >
      <StatusBar style={theme === "dark"? "light": "dark"} />
      <View
        style={{flex: 1, paddingTop: 20, justifyContent:"space-between"}}
      >
        <Pressable 
        onPress={()=> router.back()}
        style={{padding: 40}}>
          <SvgXml xml={backArrowBlack} />
        </Pressable>
        <View style={{ gap: 30, marginBottom: "10%" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <View style={{ gap: 5 }}>
              <SvgXml xml={audioPlayHistoryIcon} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white" }}>19:00</Text>
                <Text style={{ color: "white" }}>30:00</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <TouchableWithoutFeedback>
                <Text
                  style={[
                    Typography.bold.large,
                    {
                      paddingVertical: 20,
                      paddingHorizontal: 70,
                      backgroundColor: theme === "dark" ? Colors.dark._3 : Colors.others.white,
                      color: Colors.main.primary._500,
                      borderRadius: 100,
                    },
                  ]}
                >
                  Stop
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Text
                  style={[
                    Typography.bold.large,
                    {
                      paddingVertical: 20,
                      paddingHorizontal: 70,
                      backgroundColor: Colors.main.primary._500,
                      color: Colors.others.white,
                      borderRadius: 100,
                    },
                  ]}
                >
                  Pause
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default VideoPlayer;
