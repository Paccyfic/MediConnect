import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import React, { useContext } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";

const AttachComponent = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme === "dark" ? Colors.dark._3 : "white",
        padding: 40,
        borderRadius: 20,
      }}
    >
      <View style={styles.card}>
        <Image source={require("@/assets/images/documentImg.png")} />
        <Text style={[Typography.semiBold.large, styles.text, {color: theme==="dark"? "white": "black"}]}>Document</Text>
      </View>
      <View style={styles.card}>
        <Image source={require("@/assets/images/garellyImg.png")} />
        <Text style={[Typography.semiBold.large, styles.text,{color: theme==="dark"? "white": "black"}]}>Gallery</Text>
      </View>
      <View style={styles.card}>
        <Image source={require("@/assets/images/audioImg.png")} />
        <Text style={[Typography.semiBold.large, styles.text, {color: theme==="dark"? "white": "black"}]}>Audio</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default AttachComponent;
