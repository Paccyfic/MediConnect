import React from "react";
import { Logo } from "@/assets/icons/Logo";
import {
  ThreeDotCircle,
  ThreeDotCircleDark,
} from "@/assets/icons/ThreeDotCircle";
import Header from "@/components/UI/Header";
import { ScanDarkIcon, ScanLightIcon } from "@/components/UI/Icons";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import { Stack } from "expo-router";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function Layout() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <Header
              title="Profile"
              options={{
                leftComponent: () => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <SvgXml xml={Logo} />
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
                        Profile
                      </Text>
                    </View>
                  );
                },
                rightComponent: () => {
                  return (
                    <Pressable onPress={() => {}}>
                      <SvgXml
                        xml={
                          theme === "light"
                            ? ThreeDotCircle
                            : ThreeDotCircleDark
                        }
                      />
                    </Pressable>
                  );
                },
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        options={{
          header: () => <Header title="Edit Profile" />,
        }}
      />
      <Stack.Screen
        name="Notification"
        options={{ header: () => <Header title="Notification" /> }}
      />
      <Stack.Screen
        name="Payment"
        options={{
          header: () => (
            <Header
              title="Payment"
              options={{
                rightComponent: () => (
                  <Pressable onPress={() => {}} style={{}}>
                    <SvgXml
                      xml={theme === "light" ? ScanLightIcon : ScanDarkIcon}
                    />
                  </Pressable>
                ),
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Security"
        options={{ header: () => <Header title="Security" /> }}
      />
      <Stack.Screen
        name="InviteFriends"
        options={{ header: () => <Header title="Invite Friends" /> }}
      />
      <Stack.Screen
        name="Languages"
        options={{ header: () => <Header title="Languages" /> }}
      />
      <Stack.Screen
        name="HelpCenter"
        options={{
          header: () => (
            <Header
              title="Help Center"
              options={{
                rightComponent: () => {
                  return <SvgXml xml={ThreeDotCircle} />;
                },
              }}
            />
          ),
        }}
      />
    </Stack>
  );
}
