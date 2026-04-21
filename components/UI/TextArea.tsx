import { View } from "react-native";
import { TextInput } from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  text: string;
  onChangeText:(text:string)=>void
}

export default function TextArea({ text,onChangeText }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor:
          theme === "light" ? Colors.grayScale._50 : Colors.dark._2,
        height: 210,
        borderRadius: 20,
      }}
    >
      <TextInput
        placeholder="Describe how you are feeling here..."
        placeholderTextColor={
          theme === "light" ? Colors.grayScale._500 : Colors.grayScale._400
        }
        style={[
          Typography.semiBold.medium,
          {
            padding: 20,
            color:
              theme === "light" ? Colors.grayScale._900 : Colors.others.white,
          },
        ]}
        multiline
        value={text}
        onChangeText={onChangeText}
      />
    </View>
  );
}