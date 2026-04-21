import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { bluePlayBtn } from "@/components/UI/icons/playBtn";
import { Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { Image } from "react-native";
import { Text } from "react-native";
import { BlueDoubleTick } from "@/components/UI/icons/doubleTickIcon";
import {Colors} from "@/constants/Colors";
import { Ionicons} from "@expo/vector-icons";


export default function PlaySound() {
  const [sound, setSound] = useState();
  const [isPLaying, setIsPlaying] = useState(false) 

  function handlePlay(){
    setIsPlaying(!isPLaying)
  }

  async function playSound() {
    // console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/images/sound.mp3")
    );
    // console.log(sound);
    setSound(sound);

    // console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
          console.log(sound)
        }
      : undefined;
  }, [sound]);

  function stopPlay(){
    console.log("audio paused")
  }

  return (
    <View
      style={{
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        backgroundColor: Colors.transparent.blue,
        padding: 20,
        borderRadius: 100,
        marginTop: 10,
      }}
    >
        {
            isPLaying ?
               (<Pressable onPress={()=> {
                stopPlay();
                handlePlay()
              }}>
                <Ionicons name="stop-circle" size={20} style={{color: Colors.main.primary._500}}/>
              </Pressable> ): 
               (<Pressable onPress={()=>{
                playSound();
                handlePlay();
            }}>
                <SvgXml xml={bluePlayBtn} />
              </Pressable>)
        }
    
      <Image source={require("@/assets/images/audioGradient.png")} />
      <Text style={{ color: Colors.main.primary._500 }}>16:00</Text>
      <SvgXml xml={BlueDoubleTick} />
    </View>
  );
}
