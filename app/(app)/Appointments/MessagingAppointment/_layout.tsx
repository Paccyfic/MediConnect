import React from "react";
import {Stack, } from "expo-router";
import {
  OverlayProvider,
  Chat,
} from "stream-chat-expo";
import {StreamChat } from "stream-chat";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "@/ctx/ChatContext";
import {Colors} from "@/constants/Colors";
import { Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { moreBlackIcon } from "@/constants/icon";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY;

const chatClient = StreamChat.getInstance(`${API_KEY}`);

const InitialLayout = () => {

  return (
    <OverlayProvider>
      <Chat client={chatClient} >
        <Stack>
        <Stack.Screen name="index" options={{ headerShown:false}} />
          <Stack.Screen name="Home" options={{ 
            title: "Appointment rooms",
            headerRight: () => (
              <Pressable>
                  <SvgXml xml={moreBlackIcon} />
              </Pressable>
          
            ),
            }}/>
          <Stack.Screen
            name="ChannelList"
            options={{ title: "Chat lists" }}
          />
       <Stack.Screen name="ChannelScreen" options={{headerShown:false}}/>
        </Stack>
      </Chat>
    </OverlayProvider>
  );
};

export default function Layout() {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </AppProvider>
  );
}
