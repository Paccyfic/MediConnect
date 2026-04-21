import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Pressable, View } from "react-native";

interface Props {
  active?: boolean;
  onPress: () => void;
}

export default function Switch({ active, onPress }: Props) {
  const [value, setValue] = useState(active);

  return (
    <Pressable
      onPress={() => {
        setValue((preVal) => !preVal);
        onPress();
      }}
      style={{
        backgroundColor: value
          ? Colors.main.primary._500
          : Colors.grayScale._200,
        height: 15,
        width: 44,
        alignItems: value ? "flex-end" : "flex-start",
        justifyContent: "center",
        paddingHorizontal: 4,
        paddingVertical: 12,
        borderRadius: 100,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.others.white,
          height: 15,
          width: 15,
          borderRadius: 100,
        }}
      ></View>
    </Pressable>
  );
}
