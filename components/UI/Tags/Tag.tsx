import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext } from "react";
import { StyleProp } from "react-native";
import { Pressable, Text, ViewStyle } from "react-native";
import React from "react";

interface Props {
  title: string;
  selected?: boolean;
  onPress: () => void;
  padding?: {
    horizontal: number;
    vertical: number;
  };
}

export default function Tag({ selected, title, onPress, padding }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={[
        {
          paddingHorizontal: padding?.horizontal ? padding?.horizontal : 15,
          paddingVertical: padding?.vertical ? padding?.vertical : 4,
          borderWidth: 2,
          borderColor: Colors.main.primary._500,
          borderRadius: 100,
          backgroundColor: selected
            ? Colors.main.primary._500
            : theme === "light"
            ? Colors.others.white
            : Colors.dark._1,
        },
      ]}
    >
      <Text
        style={[
          Typography.semiBold.large,
          { color: selected ? Colors.others.white : Colors.main.primary._500 },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
