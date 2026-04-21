import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import Switch from "../UI/Switch";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  value?: boolean;
  title: string;
}

export default function SwitchNotificationListing({ title, value }: Props) {
  const { theme } = useContext(ThemeContext);
  const [on, setOn] = useState(value ?? false);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[
            Typography.semiBold.xLarge,
            {
              color:
                theme === "light" ? Colors.grayScale._900 : Colors.others.white,
            },
          ]}
        >
          {title}
        </Text>
        <Switch
          active={on}
          onPress={() => {
            setOn((prevVal) => {
              return !prevVal;
            });
          }}
        />
      </View>
    </>
  );
}
