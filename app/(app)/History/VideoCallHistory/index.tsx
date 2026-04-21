import { MoreIcon } from "@/assets/icons/MoreCircleSvg";
import { SearchIcon } from "@/assets/icons/SearchSvg";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {  TouchableOpacity } from "react-native";
import { Image, Text, View, FlatList } from "react-native";
import { SvgXml } from "react-native-svg";
import DoctorComponent from "../CardComponent";
import { BlueRightIconWithBg } from "@/components/UI/icons/rigthIcon";
import { router } from "expo-router";

const Ddata = [
  {
    id: "1",
    image: require("@/assets/images/Dr maria.png"),
    method: "video call",
    name: "dr Drake",
    message: "my pleasure all the best for your carrier life",
    day: "Today",
    time: "10:00 AM",
  },
  {
    id: "2",
    image: require("@/assets/images/Dr maria.png"),
    method: "voice call",
    name: "dr Drake",
    message: "my pleasure all the best for your carrier life",
    day: "Today",
    time: "10:00 AM",
  },
  {
    id: "3",
    image: require("@/assets/images/Dr maria.png"),
    method: "voice call",
    name: "dr Drake",
    message: "my pleasure all the best for your carrier life",
    day: "Today",
    time: "10:00 AM",
  },
];

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.others.white,
        flexDirection: "column",
        padding: 20,
      }}
    >
      <StatusBar style="dark" />
      <View style={{ paddingTop: 20, gap: 30 }}>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{ backgroundColor: "transparent" }}
              source={require("@/assets/images/DefaultLogo.png")}
            />
            <Text
              style={[
                Typography.bold.large,
                { fontSize: 22, marginLeft: "3%" },
              ]}
            >
              History
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <TouchableOpacity>
              <SvgXml xml={SearchIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <SvgXml xml={MoreIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#D3D3D3",
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity>
            <Text
              style={[
                Typography.semiBold.xLarge,
                { color: Colors.grayScale._400 },
              ]}
            >
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                Typography.semiBold.xLarge,
                { color: Colors.grayScale._400 },
              ]}
            >
              Voice Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                Typography.semiBold.xLarge,
                { color: Colors.grayScale._400 },
              ]}
            >
              Video call
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
      
        data={Ddata}
        renderItem={({ item, index}) => (
        <DoctorComponent
          imageSource={item.image}
          name={item.name} 
          iconComponent={<SvgXml xml={BlueRightIconWithBg} />}
          method={item.method} 
          day={item.day} 
          time={item.time}
          handle={() =>router.push("History/VideoCallHistory/[id]")}
        />)}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 20}} />}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

export default index;
