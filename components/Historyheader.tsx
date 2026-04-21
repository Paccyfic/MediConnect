import React, { useContext } from "react";
import { SearchIcon } from "@/assets/icons/SearchSvg";
import Typography from "@/constants/Typography";
import { Platform, TouchableOpacity } from "react-native";
import { Image, ImageBackground, Text, View, FlatList } from "react-native";
import { SvgXml } from "react-native-svg";
import { filterWhiteIcon } from "./UI/icons/filterIcon";
import { ThemeContext } from "@/ctx/ThemeContext";
import { moreGrayIcon, moreWhiteIcon } from "./UI/icons/circleWithDots";
import { Logo } from "@/assets/icons/Logo";

interface header {
  onSearchPressed: () => void;
  headerText: string
}

function Historyheader({ onSearchPressed, headerText }: header) {
  const { theme, changeTheme } = useContext(ThemeContext);
  return (
    <View style={{ paddingTop: 20, gap: 30, width: "100%" }}>
      <View
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <SvgXml xml={Logo} />
          <Text
            style={[Typography.bold.large, { fontSize: 22, marginLeft: "3%", color: theme==="dark"? "white": "black" }]}
          >
            {headerText}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TouchableOpacity onPress={onSearchPressed}>
            <SvgXml xml={theme === "dark" ? filterWhiteIcon : SearchIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgXml xml={theme === "dark" ? moreWhiteIcon : moreGrayIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Historyheader;
