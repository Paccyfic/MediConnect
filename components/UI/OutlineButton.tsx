import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Pressable, Text } from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
}

export default function OutlineButton({ title, onPress }: Props) {
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Pressable
        style={{
          backgroundColor: pressed
            ? Colors.others.white
            : Colors.main.primary._500,
          borderColor: Colors.main.primary._500,
          borderWidth: 2,
          paddingHorizontal: 20,
          paddingVertical: 8,
          borderRadius: 20,
          marginLeft: "auto",
        }}
        onPress={() => {
          setPressed(true);
          setTimeout(() => {
            setPressed(false);
          }, 200);
          onPress && onPress();
        }}
      >
        <Text style={{ color: pressed ? Colors.main.primary._500 : "white" }}>
          {title}
        </Text>
      </Pressable>
    </>
  );
}
