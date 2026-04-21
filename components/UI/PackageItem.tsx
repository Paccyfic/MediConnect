import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { checkedRadioBtn, uncheckedRadioBtn } from "./Icons";
import Typography from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  title: string;
  description: string;
  price: string;
  selected?: boolean;
  icon: () => React.JSX.Element;
  onPress: () => void;
}

export default function PackageItem({
  title,
  description,
  price,
  selected,
  icon,
  onPress,
}: Props) {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        margin: 10,
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._2,
        borderRadius: 20,
        elevation: theme === "light" ? 20 : 0,
        shadowColor: theme === "light" ? Colors.grayScale._400 : Colors.dark._2,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <View
          style={{
            backgroundColor: Colors.transparent.blue,
            padding: 15,
            borderRadius: 100,
          }}
        >
          {icon()}
        </View>
        <View style={{ gap: 4 }}>
          <Text
            style={[
              Typography.bold.large,
              {
                color:
                  theme === "light"
                    ? Colors.grayScale._900
                    : Colors.others.white,
              },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              Typography.medium.small,
              {
                color:
                  theme === "light"
                    ? Colors.grayScale._700
                    : Colors.grayScale._300,
              },
            ]}
          >
            {description}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        <View>
          <Text
            style={[
              Typography.bold.xLarge,
              { color: Colors.main.primary._500 },
            ]}
          >
            {price}
          </Text>
          <Text
            style={[
              Typography.medium.xSmall,
              {
                color:
                  theme === "light"
                    ? Colors.grayScale._700
                    : Colors.grayScale._300,
              },
            ]}
          >
            /30 mins
          </Text>
        </View>
        <SvgXml xml={selected ? checkedRadioBtn : uncheckedRadioBtn} />
      </View>
    </Pressable>
  );
}
