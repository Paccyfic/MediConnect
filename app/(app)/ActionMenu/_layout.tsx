import { MoreIcon } from "@/assets/icons/MoreCircleSvg";
import Header from "@/components/UI/Header";
import { Stack } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";
import { Alert } from "react-native";


export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="NotificationScreen"
        options={{
          header: () => (
            <Header
              title="Notifications"
              options={{ rightComponent: () => <SvgXml xml={MoreIcon}  /> }}
            />
          ),
        }}
      />
      <Stack.Screen name="Booking" options={{ headerShown: false }} />
      <Stack.Screen
        name="FavoriteDoctorScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AllDoctorScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
