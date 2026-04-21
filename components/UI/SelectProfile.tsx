import { EditBlueIcon } from "@/assets/icons/EditBlueIcon";
import {
  EmptyImageContainer,
  EmptyImageContainerDark,
} from "@/assets/icons/EmptyImageContainer";
import { useContext, useState } from "react";
import { Image, Pressable } from "react-native";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ThemeContext } from "@/ctx/ThemeContext";
import { ImageType } from "@/constants/Types";

interface Props {
  image?: ImageType | null;
  onChange: (name: string, value: ImageType | string) => void;
}

export default function SelectProfile({ image, onChange }: Props) {
  const { theme } = useContext(ThemeContext);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName!,
        mimeType: result.assets[0].mimeType!,
      });
    }
  }

  return (
    <>
      <View style={{ position: "relative" }}>
        {image?.uri !== "" ? (
          <Image
            source={{ uri: image?.uri }}
            style={{ width: 160, height: 160, borderRadius: 100 }}
          />
        ) : (
          <SvgXml
            xml={
              theme === "light" ? EmptyImageContainer : EmptyImageContainerDark
            }
          />
        )}
        <Pressable
          onPress={pickImage}
          style={{
            position: "absolute",
            bottom: 5,
            right: 15,
          }}
        >
          <SvgXml xml={EditBlueIcon} />
        </Pressable>
      </View>
    </>
  );
}
