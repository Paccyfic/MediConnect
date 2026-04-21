import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface Props {
  percentage: number;
}

export function ResponsiveWidth({ percentage }: Props) {
  return (percentage / 100) * screenWidth;
}
