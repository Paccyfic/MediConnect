import LanguagesList from "@/components/Profile/LanguagesList";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/ctx/ThemeContext";
import { countries } from "countries-list";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";

export default function Languages() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <View
        style={{
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
          height: "100%",
        }}
      >
        <View
          style={{
            gap: 30,
            paddingHorizontal: 20,
            paddingVertical: 20,
            height: "100%",
          }}
        >
          <LanguagesList />
        </View>
      </View>
    </>
  );
}
