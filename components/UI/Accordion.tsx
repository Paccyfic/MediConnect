import { BlueDownIcon } from "@/assets/icons/Profile/Icons";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { useContext, useState } from "react";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import HorizontalSeparator from "./HorizontalSeparator";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  title: string;
  description: string;
}

export default function Accordion({ title, description }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={() => {
        setIsOpen((prevValue) => !prevValue);
      }}
      style={{
        gap: 15,
        padding: 25,
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._2,
        elevation: theme === "light" ? 20 : 0,
        shadowColor: Colors.grayScale._400,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[
            Typography.bold.xLarge,
            {
              color:
                theme === "light" ? Colors.grayScale._900 : Colors.others.white,
            },
          ]}
        >
          {title}
        </Text>
        <SvgXml xml={BlueDownIcon} />
      </View>
      {isOpen && <HorizontalSeparator />}
      {isOpen && (
        <View>
          <Text
            style={[
              Typography.medium.medium,
              {
                color:
                  theme === "light"
                    ? Colors.grayScale._800
                    : Colors.grayScale._300,
              },
            ]}
          >
            {description}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
