import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Redirect, Stack, router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { useContext, useEffect, useState } from "react";

import * as NavigationBar from "expo-navigation-bar";
import { ZoomOutUp } from "react-native-reanimated";
import ThemeProvider, { ThemeContext } from "@/ctx/ThemeContext";
import { Pressable, View, useColorScheme } from "react-native";
import { ThemeType } from "@/constants/Types";
import { Text } from "@/components/Themed";
import ModalProvider from "@/ctx/ModalContext";
import ModalContainer from "@/components/UI/Modal";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { StatusBar } from "expo-status-bar";
import AuthProvider, { useAuth } from "@/ctx/AuthContext";
import NotificationsProvider, {
  useNotifications,
} from "@/ctx/NotificationsContext";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(app)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Medium: require("../assets/fonts/Urbanist-Medium.ttf"),
    SemiBold: require("../assets/fonts/Urbanist-SemiBold.ttf"),
    Bold: require("../assets/fonts/Urbanist-Bold.ttf"),
    Regular: require("../assets/fonts/Urbanist-Regular.ttf"),
    ...FontAwesome.font,
  });

  const systemTheme = useColorScheme() as ThemeType;

  const [favoredTheme, setFavoredTheme] = useState<ThemeType>(null);

  useEffect(() => {
    async function getCustomTheme() {
      try {
        let favoredTheme = (await SecureStore.getItemAsync(
          "theme"
        )) as ThemeType;

        if (!favoredTheme) {
          favoredTheme = systemTheme;
        }

        setFavoredTheme(favoredTheme);
      } catch (e) {
        console.log(e);
      }
    }

    getCustomTheme();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function handleNavigationButtons() {
      await NavigationBar.setPositionAsync("absolute");
      await NavigationBar.setBackgroundColorAsync("#ffffff00");
      await NavigationBar.setBehaviorAsync("inset-swipe");
      await NavigationBar.setVisibilityAsync("hidden");

      NavigationBar.addVisibilityListener(({ visibility }) => {
        if (visibility === "visible") {
          setTimeout(async () => {
            await NavigationBar.setVisibilityAsync("hidden");
          }, 2000);
        }
      });
    }
    if (loaded) {
      handleNavigationButtons();
      SplashScreen.hideAsync();
    }
  }, [loaded, favoredTheme]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={favoredTheme}>
      <ModalProvider>
        <AuthProvider>
          <AutocompleteDropdownContextProvider>
            <NotificationsProvider>
              <RootLayoutNav />
            </NotificationsProvider>
          </AutocompleteDropdownContextProvider>
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { isLoggedIn, activated, email } = useAuth();
  const segments = useSegments();

  const inAuth = segments[0] === "(auth)";
  const { notifications } = useNotifications();

  console.log(notifications);

  useEffect(() => {
    if (!isLoggedIn && !inAuth) {
      console.log("Not logged in");
      return router.replace("/(auth)/SignIn&SignOut/LetsYouIn");
    }

    // if (isLoggedIn && !activated && !email) {
    //   console.log("Logged in, not activated, without email");
    //   return router.replace("/(auth)/SignIn&SignOut/LetsYouIn");
    // }

    if (isLoggedIn && !activated && email) {
      console.log("Logged, not activated, and with email");
      return router.replace("/(auth)/SignIn&SignOut/YourProfile/" + email);
    }

    if (isLoggedIn && activated && inAuth) {
      console.log("Logged in, activated, and in auth");
      return router.replace("/(app)/ActionMenu");
    }
  }, [isLoggedIn, activated, router, segments, email]);

  return (
    <>
      <Stack screenOptions={{ statusBarTranslucent: true, headerShown: false }}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="onBoarding"
          options={{ headerShown: false }}
          redirect={inAuth || !inAuth}
        />
      </Stack>
      <ModalContainer />
    </>
  );
}
