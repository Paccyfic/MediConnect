import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import {
  Pressable,
  StyleProp,
  StyleSheetProperties,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Text } from "../Themed";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  title?: string;
  type?: "primary" | "dark" | "gray" | "light" | "outline";
  radius?: "medium" | "large";
  active?: boolean;
  leftIcon?: () => React.JSX.Element;
  rightIcon?: () => React.JSX.Element;
  onPress: () => void;
  icon?: () => React.JSX.Element;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  padding?: { vertical: number; horizontal: number };
}

export default function Button({
  title,
  type,
  radius,
  active,
  leftIcon,
  rightIcon,
  onPress,
  icon,
  style,
  titleStyle,
  padding,
}: Props) {
  const { theme } = useContext(ThemeContext);
  let variableStyles: {
    backgroundColor: string;
    textColor: string;
    shadowColor: string;
    borderRadius: number;
    elevation: number;
    borderColor: string;
  } = {
    backgroundColor: Colors.main.primary._500,
    textColor: Colors.others.white,
    shadowColor: Colors.main.primary._500,
    borderRadius: 100,
    elevation: 0,
    borderColor: Colors.main.primary._200,
  };

  let isActive = active === undefined ? true : active;

  if (type === "primary") {
    variableStyles.elevation = 8;
  }
  if (type === "gray") {
    variableStyles.backgroundColor = Colors.dark._3;
    variableStyles.textColor = Colors.others.white;
  } else if (type === "dark") {
    variableStyles.backgroundColor = Colors.dark._1;
    variableStyles.textColor = Colors.others.white;
  } else if (type === "light") {
    variableStyles.backgroundColor = Colors.main.primary._100;
    variableStyles.textColor = Colors.main.primary._500;
  } else if (type === "outline") {
    variableStyles.backgroundColor =
      theme === "light" ? Colors.others.white : Colors.dark._2;
    variableStyles.textColor =
      theme === "light" ? Colors.grayScale._900 : Colors.others.white;
    variableStyles.shadowColor = "none";
    variableStyles.elevation = 0;
    variableStyles.borderColor =
      theme === "light" ? Colors.main.primary._200 : Colors.dark._3;
  } else {
    variableStyles.elevation = 8;
  }

  if (radius === "medium") {
    variableStyles.borderRadius = 20;
  }

  return (
    <Pressable
      style={[
        {
          backgroundColor: !isActive
            ? Colors.status.disabled_button
            : variableStyles.backgroundColor,
          borderRadius: variableStyles.borderRadius,
          shadowColor: isActive ? variableStyles.shadowColor : "none",
          elevation: isActive ? variableStyles.elevation : 0,
          borderWidth: type === "outline" ? 1 : 0,
          borderColor: type === "outline" ? variableStyles.borderColor : "none",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: padding?.horizontal ?? 16,
          paddingVertical: padding?.vertical ?? 18,
          gap: 10,
        },
        style,
      ]}
      onPress={() => {
        isActive && onPress();
      }}
    >
      {leftIcon && leftIcon()}
      {icon ? (
        icon()
      ) : (
        <Text
          style={[
            Typography.bold.large,
            {
              textAlign: "center",
              color: variableStyles.textColor,
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}
      {rightIcon && rightIcon()}
    </Pressable>
  );
}
