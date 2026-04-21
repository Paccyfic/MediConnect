import { Colors } from "@/constants/Colors";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { checkedRadioBtn, uncheckedRadioBtn } from "../Icons";
import Typography from "@/constants/Typography";
import { useContext } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  selected?: boolean;
  icon: string;
  title: string;
  onPress: () => void;
}

export default function PaymentChooseInputCard({
  icon,
  title,
  selected,
  onPress,
}: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 0.5,
        shadowOpacity: 0.1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 18,
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._2,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <SvgXml xml={icon} />
        <Text
          style={[
            Typography.bold.large,
            {
              color:
                theme === "light" ? Colors.grayScale._900 : Colors.others.white,
            },
          ]}
        >
          {title}
        </Text>
      </View>

      <SvgXml xml={selected ? checkedRadioBtn : uncheckedRadioBtn} />
    </Pressable>
  );
}
