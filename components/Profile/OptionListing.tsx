import { SvgXml } from "react-native-svg";
import { View } from "../Themed";
import { Pressable, Text } from "react-native";
import { ProfileIcon, ChevronRight } from "@/assets/icons/Profile/Icons";
import Typography from "@/constants/Typography";
import React, { useContext } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";
import { Colors } from "@/constants/Colors";

interface Props {
  icon: () => React.JSX.Element;
  title: string;
  textColor?: string;
  rightComponent?: () => React.JSX.Element;
  onPress?: () => void;
}

export default function OptionListing({
  icon,
  title,
  rightComponent,
  textColor,
  onPress,
}: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
          gap: 15,
          alignItems: "center",
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
        }}
      >
        {icon()}
        <Text style={[Typography.semiBold.xLarge, { color: textColor }]}>
          {title}
        </Text>
        {/* </View> */}
        <View
          style={{
            marginLeft: "auto",
            backgroundColor:
              theme === "light" ? Colors.others.white : Colors.dark._1,
          }}
        >
          {rightComponent && rightComponent()}
        </View>
      </Pressable>
    </>
  );
}
