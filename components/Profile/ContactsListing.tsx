import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import React from "react";

interface Props {
  icon: () => React.JSX.Element;
  title: string;
  onPress: () => void;
}

export default function ContactsListing({ icon, title, onPress }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
        padding: 20,
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._2,
        elevation: theme === "light" ? 20 : 0,
        shadowColor: Colors.grayScale._400,
        borderRadius: 20,
      }}
    >
      {icon()}
      <Text
        style={[
          Typography.bold.xLarge,
          {
            color:
              theme === "light" ? Colors.grayScale._900 : Colors.others.white,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
