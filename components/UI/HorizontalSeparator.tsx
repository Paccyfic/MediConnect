import { View } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  width?: number;
  color?: string;
}
export default function HorizontalSeparator({ width, color }: Props) {
  return (
    <View
      style={{
        width: width ? width : "100%",
        height: 1,
        backgroundColor: color ? color : Colors.grayScale._200,
      }}
    ></View>
  );
}
