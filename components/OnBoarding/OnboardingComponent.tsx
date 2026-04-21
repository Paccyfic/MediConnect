import React, { ReactElement, useContext, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  Image,
  Pressable,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { ThemeContext } from "@/ctx/ThemeContext";
import { StatusBar } from "expo-status-bar";

const OnboardingComponent = ({
  image,
  text,
  action,
  direction,
  children,
}: {
  image: any;
  text: string;
  action: string;
  direction: any;
  children: React.ReactNode;
}) => {
  const { theme, changeTheme } = useContext(ThemeContext);


  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "dark"}/>
      <View style={theme === "light" ? styles.lightContainer: styles.DarkContainer }>
        <View style={styles.img}>
          <Image source={image} />
        </View>
        <View style={styles.LowerSection}>
          <Text style={theme === "light" ? styles.titleLight : styles.titleDark }>
            {text}
          </Text>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {children}
          </View>
          <Pressable onPress={() => router.push(direction)} style={styles.btn}>
            <Text style={styles.btnText}>{action}</Text>
          </Pressable>
        </View>
    </View>
    </>
   
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.others.white
  },

  DarkContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.others.black
  },

  img: {
    paddingHorizontal: 8,
    alignSelf: "center",
  },

  LowerSection: {
    flexDirection: "column",
    gap: 48,
    paddingVertical: 48,
  },

  titleLight: {
    color: Colors.main.primary._500,
    fontSize: 40,
    paddingHorizontal: 8,
    textAlign: "center",
    fontFamily: "Bold",
  },

  titleDark: {
    color: Colors.others.white,
    fontSize: 40,
    paddingHorizontal: 8,
    textAlign: "center",
    fontWeight: "bold",
  },

  dots: {
    width: 10,
    height: 10,
    backgroundColor: Colors.grayScale._300,
    borderRadius: 100,
    marginHorizontal: 3,
  },

  btn: {
    backgroundColor: Colors.main.primary._500,
    textAlign: "center",
    padding: 18,
    borderRadius: 100,
    alignContent: "flex-end",
  },

  btnText: {
    color: Colors.others.white,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingComponent;
