import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import {
  Pressable,
  StyleProp,
  StyleSheetProperties,
  TextStyle,
  ViewStyle,
  View,
} from "react-native";
import { Text } from "../Themed";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  text?: string;
  type?: "filled" | "border";
  size?: "medium" | "large" | "small";
  leftIcon?: () => React.JSX.Element;
  rightIcon?: () => React.JSX.Element;
  onPress?: () => void;
  icon?: () => React.JSX.Element;
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
}

export default function Chips({
  text,
  type,
  size,
  leftIcon,
  rightIcon,
  onPress,
  icon,
  selected,
  style,
}: Props) {
  const { theme } = useContext(ThemeContext);
  let variableStyles: {
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    borderColor: string;

    height: number;
  } = {
    backgroundColor: Colors.main.primary._500,
    textColor: Colors.others.white,
    borderRadius: 100,
    borderColor: Colors.main.primary._200,

    height: 45,
  };

  if (type === "filled") {
    variableStyles.backgroundColor = Colors.main.primary._500;
    variableStyles.textColor = Colors.others.white;
  } else if (type === "border") {
    variableStyles.backgroundColor = "transparent";
    variableStyles.borderColor = Colors.main.primary._500;
    variableStyles.textColor = Colors.main.primary._500;
  }

  if (size === "large") {
    variableStyles.height = 45;
  } else if (size === "medium") {
    variableStyles.height = 38;
  } else if (size === "small") {
    variableStyles.height = 32;
  }

  return (
    <Pressable
      style={[
        {
          backgroundColor: selected
            ? Colors.main.primary._500
            : variableStyles.backgroundColor,
          height: variableStyles.height,
          borderRadius: variableStyles.borderRadius,
          borderWidth: type === "border" ? 2 : 0,
          borderColor: type === "border" ? variableStyles.borderColor : "none",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          gap: 10,
        },
        style,
      ]}
      onPress={onPress}
    >
      {leftIcon && leftIcon()}
      {icon ? (
        icon()
      ) : (
        <Text
          style={[
            size === "large"
              ? Typography.bold.xLarge
              : size === "medium"
              ? Typography.semiBold.large
              : size === "small"
              ? Typography.semiBold.medium
              : {},
            {
              textAlign: "center",
              color: selected ? Colors.others.white:variableStyles.textColor,
            },
          ]}
        >
          {text}
        </Text>
      )}
      {rightIcon && rightIcon()}
    </Pressable>
  );
}
