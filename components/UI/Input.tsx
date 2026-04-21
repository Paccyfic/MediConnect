import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import React, { useContext } from "react";
import { Pressable, View } from "react-native";
import { TextInput } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  textInputConfig?: object;
  rightElement?: () => React.JSX.Element;
  leftElement?: () => React.JSX.Element;
  name?: string;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
  editable?: boolean;
  onPress?: () => void;
}

export default function Input({
  name = "Your name is empty",
  onChange,
  placeholder,
  value,
  textInputConfig,
  rightElement,
  leftElement,
  disabled,
  editable,
  onPress,
}: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable
      style={{
        backgroundColor:
          theme === "light" ? Colors.grayScale._50 : Colors.dark._2,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
      onPress={onPress}
    >
      {leftElement && leftElement()}
      <TextInput
        placeholder={placeholder}
        value={value}
        editable={!disabled}
        {...textInputConfig}
        style={[
          Typography.semiBold.medium,
          {
            color:
              theme === "light" ? Colors.grayScale._900 : Colors.others.white,
            flexGrow: 1,
            paddingVertical: 15,
          },
        ]}
        placeholderTextColor={Colors.grayScale._500}
        onChangeText={(val) => {
          onChange(name, val);
        }}
      />

      {rightElement && rightElement()}
    </Pressable>
  );
}
