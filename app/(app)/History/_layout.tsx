import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="MessageHistory/Chats" options={{ headerShown: false }} />
      <Stack.Screen name="VoiceCallHistory/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="VideoCallHistory/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="VideoCallHistory/VideoPlayer" options={{ headerShown: false }} />
    </Stack>
  );
}
