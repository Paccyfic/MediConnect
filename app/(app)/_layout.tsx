import React, { useContext, useState } from "react";
import CustomTabBarIcon from "@/components/UI/CustomTabBarIcon";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import { Tabs, useSegments } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

// Maps exact Expo Router route name → display label
const TAB_LABELS: Record<string, string> = {
  ActionMenu: "Home",
  "Appointments/index": "Appointm",
  History: "History",
  Articles: "Articles",
  Profile: "Profile",
};

// Maps exact Expo Router route name → icon key used by CustomTabBarIcon
const TAB_ICON_NAME: Record<string, string> = {
  ActionMenu: "ActionMenu",
  "Appointments/index": "Appointments",
  History: "History",
  Articles: "Articles",
  Profile: "Profile",
};

// Only these 5 routes appear in the tab bar
const VISIBLE_TABS = new Set([
  "ActionMenu",
  "Appointments/index",
  "History",
  "Articles",
  "Profile",
]);

export default function Layout() {
  const { theme } = useContext(ThemeContext);
  const [tabVisible] = useState(false);
  const segments = useSegments();

  return (
    <Tabs
      tabBar={({ state, navigation, descriptors }) => {
        const isVisible =
          tabVisible ||
          state.routeNames.includes(segments[segments.length - 1]);

        if (!isVisible) return null;

        const visibleRoutes = state.routes.filter((r) =>
          VISIBLE_TABS.has(r.name)
        );

        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor:
                theme === "dark" ? Colors.dark._1 : Colors.others.white,
              paddingVertical: 10,
              height: 65,
              borderTopWidth: 1,
              borderTopColor:
                theme === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)",
            }}
          >
            {visibleRoutes.map((route) => {
              const { options } = descriptors[route.key];
              const isFocused =
                route.name === state.routes[state.index].name;
              const label = TAB_LABELS[route.name] ?? route.name;
              const iconName = TAB_ICON_NAME[route.name] ?? route.name;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                });
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <CustomTabBarIcon name={iconName} isFocused={isFocused} />
                  <Text
                    style={[
                      isFocused
                        ? Typography.bold.xSmall
                        : Typography.medium.xSmall,
                      {
                        color: isFocused
                          ? Colors.main.primary._500
                          : Colors.grayScale._500,
                        textAlign: "center",
                        fontSize: 11,
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="ActionMenu" options={{ title: "Home" }} />
      <Tabs.Screen name="Appointments/index" options={{ title: "Appointm" }} />
      <Tabs.Screen name="History" options={{ title: "History" }} />
      <Tabs.Screen name="Articles" options={{ title: "Articles" }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}