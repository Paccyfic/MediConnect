import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import Typography from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { color } from "react-native-elements/dist/helpers";
import { useContext } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  const { theme } = useContext(ThemeContext);

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarLabelStyle: [Typography.semiBold.large],
        tabBarActiveTintColor: Colors.main.primary._500,
        tabBarInactiveTintColor: Colors.grayScale._500,
        tabBarStyle: {
          elevation: 0,
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.main.primary._500,
          paddingVertical: 1.5,
        },
        tabBarBounces: true,
      }}
    >
      <MaterialTopTabs.Screen name="FAQ" options={{ title: "FAQ" }} />
      <MaterialTopTabs.Screen
        name="ContactUs"
        options={{
          title: "Contact us",
          tabBarLabelStyle: [
            Typography.semiBold.large,
            { textTransform: "capitalize" },
          ],
        }}
      />
    </MaterialTopTabs>
  );
}
