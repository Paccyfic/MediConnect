import Header from "@/components/UI/Header";
import Modal from "@/components/UI/Modal";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="SignIn&SignOut/SignUpBlankForm"
          options={{ header: () => (<Header title="" />) }}

        />
        <Stack.Screen
          name="SignIn&SignOut/LetsYouIn"
          options={{ header: () => <Header title="" /> }}
        />
        <Stack.Screen
          name="SignIn&SignOut/SignInBlankForm"
          options={{ header: () => (<Header title="" />) }}
        />
        <Stack.Screen
          name="ForgotPassword&Reset/[OTPform]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateNewPassword"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword&Reset/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn&SignOut/YourProfile/[email]"
          options={{ header: () => <Header title="Fill Your Profile" /> }}
        />
        <Stack.Screen
          name="SignIn&SignOut/Create-NewPin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn&SignOut/SetYourFingerPrint"
          options={{ header: () => <Header title="Set Your Fingerprint" /> }}
        />
      </Stack>
    </>
  );
}
