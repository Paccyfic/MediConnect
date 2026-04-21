import React, { useState, useContext } from "react";
import { Colors } from "@/constants/Colors";
import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Text } from "../Themed";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import { excludeRed, excludeblue, excludegreen, excludeorange } from "@/constants/icon";
import { SvgXml } from "react-native-svg";


interface Props {
  text: string;
  status: "success" | "error" | "info" | "warning";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Alerts({ text, status, style, textStyle }: Props) {
  const { theme } = useContext(ThemeContext);
  let variableStyles: {
    backgroundColor: string;
    textColor: string;
  } = {
    backgroundColor: Colors.main.primary._500,
    textColor: Colors.others.white,
  };

  if (status === "success") {
    variableStyles.backgroundColor = Colors.background.green;
    variableStyles.textColor = Colors.others.green;
  } else if (status === "error") {
    variableStyles.backgroundColor = Colors.background.pink;
    variableStyles.textColor = Colors.others.pink;
  } else if (status === "warning") {
    variableStyles.backgroundColor = Colors.background.orange;
    variableStyles.textColor = Colors.others.orange;
  } else if (status === "info") {
    variableStyles.backgroundColor = Colors.background.blue;
    variableStyles.textColor = Colors.others.blue;
  }

  return (
    <Pressable
      style={[
        {
          backgroundColor: variableStyles.backgroundColor,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 18,
          gap: 10,
          width: 300,
        },
        style,
      ]}
    >
      {status === "success" ? (
        <SvgXml xml={excludegreen} />
      ) : status === "error" ? (
        <SvgXml xml={excludeRed} />
      ) : status === "info" ? (
        <SvgXml xml={excludeblue} />
      ) : status === "warning" ? (
        <SvgXml xml={excludeorange} />
      ) : null}

      <Text
        style={[
          Typography.regular.xSmall,
          {
            textAlign: "center",
            color: variableStyles.textColor,
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}