import React, { useCallback, useEffect } from "react";
import { AppointmentIcon } from "@/assets/icons/AppointmentSvg";
import { ArticleIcon } from "@/assets/icons/ArticleSvg";
import { HistoryIcon } from "@/assets/icons/HistorySvg";
import { HomeIcon } from "@/assets/icons/HomeSvg";
import { ProfileIcon } from "@/assets/icons/ProfileSvg";
import CustomTabBarIcon from "@/components/UI/CustomTabBarIcon";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import { Tabs, useSegments } from "expo-router";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function Layout() {
  const { theme } = useContext(ThemeContext);

  const [tabVisible, setTabVisible] = useState(false);
  const segments = useSegments();

  return (
    <>
      <Tabs
        tabBar={({ state, navigation, descriptors }) => {
          return (
            <>
              <View
                style={{
                  display:
                    tabVisible ||
                    state.routeNames.includes(segments[segments.length - 1])
                      ? "flex"
                      : "none",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor:
                    theme === "dark" ? Colors.dark._1 : Colors.others.white,
                  paddingHorizontal: 30,
                  paddingVertical: 25,
                }}
              >
                {state.routes.map((route) => {
                  const { options } = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                      ? options.title
                      : route.name;

                  const isFocused =
                    route.name === state.routes[state.index].name;

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
                    <View key={route.key}>
                      {route.name !== "index" && (
                        <TouchableOpacity
                          id={route.key}
                          accessibilityRole="button"
                          accessibilityState={
                            isFocused ? { selected: true } : {}
                          }
                          accessibilityLabel={options.tabBarAccessibilityLabel}
                          testID={options.tabBarTestID}
                          onPress={onPress}
                          onLongPress={onLongPress}
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <CustomTabBarIcon
                            name={route.name}
                            isFocused={isFocused}
                          />
                          <Text
                            style={[
                              isFocused
                                ? Typography.bold.xSmall
                                : Typography.medium.xSmall,
                              {
                                color: isFocused
                                  ? Colors.main.primary._500
                                  : Colors.grayScale._500,
                              },
                            ]}
                          >
                            {String(label).slice(0, 8)}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </>
          );
        }}
        screenOptions={{
          tabBarStyle: {
            height: 70,
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            flexDirection: "column",
          },
          tabBarIconStyle: {
            padding: 0,
            margin: 0,
          },
          tabBarLabelStyle: {
            padding: 0,
            margin: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
            href: null,
          }}
        />
        <Tabs.Screen
          name="ActionMenu"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <SvgXml xml={HomeIcon} />;
            },
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="Appointments/index"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <SvgXml xml={AppointmentIcon} />;
            },
            title: "Appointments",
          }}
        />
        <Tabs.Screen
          name="History"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <SvgXml xml={HistoryIcon} />;
            },
            title: "History",
          }}
        />
        <Tabs.Screen
          name="Articles"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <SvgXml xml={ArticleIcon} />;
            },
            title: "Articles",
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <SvgXml xml={ProfileIcon} />;
            },
            title: "Profile",
          }}
        />
      </Tabs>
    </>
  );
}
