import { useContext, useState } from "react";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { checkedRadioBtn, uncheckedRadioBtn } from "../UI/Icons";
import Typography from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  name: string;
  selected?: boolean;
  onPress?: () => void;
}

export default function LanguageListing({ name, selected, onPress }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={() => {
        onPress && onPress();
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={[
          Typography.semiBold.xLarge,
          {
            color:
              theme === "light" ? Colors.grayScale._900 : Colors.others.white,
          },
        ]}
      >
        {name}
      </Text>
      <SvgXml xml={selected ? checkedRadioBtn : uncheckedRadioBtn} />
    </Pressable>
  );
}
