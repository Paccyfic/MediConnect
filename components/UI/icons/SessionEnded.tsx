import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { BackArrow, blackArrow, Timer, line, lineTwo } from "@/components/Icons/Icons";
import { SvgXml } from "react-native-svg";
import { router } from "expo-router";
import  Typography  from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import { StatusBar } from "expo-status-bar";

interface doctor {
  id: string;
  name: string;
  title: string;
  location: string;
}

const SessionEnded = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const doctorDetails: doctor[] = [
    {
      id: "22",
      name: "Dr. Jenny Watson",
      title: "Immunologists",
      location: "Alka Hospital in Seoul, South Korea",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#181A20" : "white" },
      ]}
    >
         <StatusBar style={theme === "light" ? "dark" : "light"}/>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={() => router.back()}>
          <SvgXml xml={theme === "dark" ? BackArrow : blackArrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.middlePart}>
        <SvgXml xml={Timer} />
        <View style={styles.middleText}>
          <Text
            style={[
              Typography.heading._5,
              { color: theme === "dark" ? "#FFFFFF" : "#212121" },
            ]}
          >
            The consultation session has ended.
          </Text>
          <Text
            style={[
              Typography.regular.large,
              { color: theme === "dark" ? "#FFFFFF" : "#212121" },
            ]}
          >
            Recordings have been saved in activity.
          </Text>
        </View>

        <View>
          <SvgXml xml={lineTwo} />
        </View>
      </View>

      <View style={styles.detail}>
        <Image source={require("@/assets/images/Jenny.png")} />
        {doctorDetails &&
          doctorDetails.map((data: doctor) => (
            <View style={styles.detail}>
              <Text
                style={[
                  Typography.heading._4,
                  { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                ]}
              >
                {data.name}
              </Text>
              <Text
                style={[
                  Typography.medium.xLarge,
                  { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                ]}
              >
                {data.title}
              </Text>
              <Text
                style={[
                  Typography.medium.medium,
                  { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                ]}
              >
                {data.location}
              </Text>
            </View>
          ))}
        <View>
          <SvgXml xml={line} />
        </View>
      </View>

      <View style={styles.Button}>
        <TouchableOpacity
          style={[
            styles.backButton,
            { backgroundColor: theme === "dark" ? "#35383F" : "#E9F0FF" },
          ]}
        >
          <Text
            style={[
              Typography.bold.large,
              { color: theme === "dark" ? "#FFFFFF" : "#246BFD" },
            ]}
          >
            Back to Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LeaveButton}>
          <Text style={[Typography.bold.large, { color: "#FFFFFF" }]}>
            Leave a Review
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionEnded;

const styles = StyleSheet.create({
  LeaveButton: {
    backgroundColor: "#246BFD",
    borderRadius: 100,
    padding: 10,
    width: 164,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#246BFD",
    elevation: 4,
  },
  backButton: {
    backgroundColor: "#E9F0FF",
    borderRadius: 100,
    padding: 10,
    width: 184,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  detail: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  middleText: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  middlePart: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  backArrow: {
    alignSelf: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
    gap: 24,
  },
});
