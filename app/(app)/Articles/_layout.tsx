import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}} />
      <Stack.Screen name="ArticleSeeAll" options={{headerShown:false}} />
      <Stack.Screen name="[ArticleDetails]" options={{headerShown:false}} />
      <Stack.Screen name="BookMarkedArticles" options={{headerShown:false}} />
    </Stack>
  );
}
