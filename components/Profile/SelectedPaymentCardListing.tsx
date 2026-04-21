import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { colors } from "react-native-elements";

interface Props {
  icon: () => React.JSX.Element;
  title?: string;
}

export default function SelectPaymentCardListing({ icon, title }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          paddingVertical: 20,
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._2,
          elevation: theme === "light" ? 20 : 0,
          shadowColor: theme === "light" ? Colors.grayScale._400 : "none",
          gap: 10,
          borderRadius: 15,
        }}
      >
        {icon()}
        <Text
          style={
            (Typography.bold.xLarge,
            {
              color:
                theme === "light" ? Colors.grayScale._900 : Colors.others.white,
            })
          }
        >
          {title}
        </Text>
        <Text
          style={[
            Typography.bold.large,
            { marginLeft: "auto", color: Colors.main.primary._500 },
          ]}
        >
          Connected
        </Text>
      </View>
    </>
  );
}
