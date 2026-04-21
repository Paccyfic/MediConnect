import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Typography from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { useContext, useEffect } from "react";
import { router } from "expo-router";
import React from "react";
import { ThemeContext } from "@/ctx/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const { theme, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      router.push("onBoarding");
    },3000);
  }, []);

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <ScrollView
        contentContainerStyle={{
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/Group.png")}
            style={{ width: "100%" }}
          />
        </View>

        <View style={{ gap: 20, paddingHorizontal: 20 }}>
          <Text
            style={[
              Typography.heading._1,
              {
                color:
                  theme === "light"
                    ? Colors.main.primary._500
                    : Colors.others.white,
                textAlign: "center",
              },
            ]}
          >
            Welcome to Medica! 👋
          </Text>
          <Text
            style={[
              Typography.medium.xLarge,
              {
                color:
                  theme === "light"
                    ? Colors.grayScale._900
                    : Colors.others.white,
                textAlign: "center",
              },
            ]}
          >
            The best online doctor appointment & consultation app of the century
            for your health and medical needs!
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
