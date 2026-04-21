import { StatusBar } from "expo-status-bar";
import { Text, View } from "../Themed";
import { Colors } from "@/constants/Colors";
import { Input, LeftArrow } from "./Icons";
import { Pressable, useColorScheme } from "react-native";
import Typography from "@/constants/Typography";
import { useContext } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";
import { NavigationState } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";

interface Props {
  title?: string;
  options?: {
    leftComponent?: () => React.JSX.Element;
    rightComponent?: () => React.JSX.Element;
  };
}

export default function Header({ title, options }: Props) {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <View
        style={{
          paddingTop: 50,
          paddingBottom: 10,
          paddingHorizontal: 20,
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {!options?.leftComponent ? (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor:
                theme === "light" ? Colors.others.white : Colors.dark._1,
            }}
          >
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <LeftArrow
                fillColor={
                  theme === "light"
                    ? Colors.grayScale._900
                    : Colors.others.white
                }
              />
            </Pressable>
            <Text
              style={[
                Typography.heading._4,
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
          </View>
        ) : (
          options?.leftComponent && options?.leftComponent()
        )}
        {options?.rightComponent && options?.rightComponent()}
      </View>
    </>
  );
}
