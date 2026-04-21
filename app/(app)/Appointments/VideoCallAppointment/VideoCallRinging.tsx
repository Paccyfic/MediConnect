import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BackArrow, Speaker, Record, hungup,BigVideoIcon } from "@/components/Icons/Icons";
import { SvgXml } from "react-native-svg";
import  Typography  from "@/constants/Typography";
import { router } from "expo-router";
const VoiceCallRinging = () => {
  return (
    <>
      <ImageBackground
        style={styles.Background}
        resizeMode="cover"
        source={require("@/assets/images/MariaBackground.png")}
      >
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={()=> router.back()}>
             <SvgXml xml={BackArrow} />
          </TouchableOpacity>
         
        </View>

        <View style={styles.middlePart}>
          <Image source={require("@/assets/images/Dr jenny.png")} style={{width: 200, height: 200, borderRadius: 100}}/>

          <View style={styles.middleText}>
            <Text style={[Typography.heading._3, { color: "#FFFFFF" }]}>
              Dr. Maria Foose
            </Text>
            <Text style={[Typography.medium.xLarge, { color: "#FFFFFF" }]}>
              Ringing...
            </Text>
          </View>
        </View>

        <View style={styles.Bottom}>
          <TouchableOpacity style={styles.speaker}>
            <SvgXml xml={Speaker} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.Video} onPress={()=> router.push('(app)/Appointments/VideoCallAppointment/VideoCall')}>
            <SvgXml xml={BigVideoIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.Record}>
            <SvgXml xml={Record} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.hangup} onPress={()=> router.push('(app)/Appointments/Review/ReviewBlankform')}>
            <SvgXml xml={hungup} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default VoiceCallRinging;

const styles = StyleSheet.create({
  speaker:{
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    padding: 20,
    opacity: 0.6
  },
  Video:{
      backgroundColor: '#F0F0F0',
      borderRadius: 100,
      padding: 20,
      opacity: 0.6
    },
  Record:{
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    padding: 23,
    opacity: 0.6
  },
  hangup:{
    backgroundColor: '#F75555',
    borderRadius: 100,
    padding: 20,

  },
  Bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  middlePart: {
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  middleText: {
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  backArrow: {
    alignSelf: "flex-start",
    marginTop: "5%"
  },
  Background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 48,
    paddingLeft: 24,
    paddingRight: 24,
    gap: 140,
  },
});