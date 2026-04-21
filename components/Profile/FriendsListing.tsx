import { Image, Text, View } from "react-native";
import Button from "../UI/Button";
import { Colors } from "@/constants/Colors";
import { Pressable } from "react-native";
import Typography from "@/constants/Typography";
import OutlineButton from "../UI/OutlineButton";
import { useContext, useState } from "react";
import { ThemeContext } from "@/ctx/ThemeContext";
import Chips from "../UI/ChipsComponent";
import React from "react";

interface Props {
  imageUrl: string;
  name: string;
  phone: string;
}

export default function FriendsListing({ imageUrl, name, phone }: Props) {
  const { theme } = useContext(ThemeContext);
  const [pressed, setPressed] = useState(false);
  
  function onPress() {
    throw new Error("Function not implemented.");
  }
    const [isInvited, setIsInvited] = useState(false);
  
    const handlePress = () => {
      setIsInvited(true);
    };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 20,
          width: "100%",
        }}
      >
        <Image source={imageUrl} />
        <View style={{ gap: 2 }}>
          <Text
            style={[
              Typography.bold.xLarge,
              {
                color:
                  theme === "light"
                    ? Colors.grayScale._900
                    : Colors.others.white,
              },
            ]}
          >
            {name}
          </Text>
          <Text
            style={[
              Typography.medium.medium,
              {
                color:
                  theme === "light"
                    ? Colors.grayScale._900
                    : Colors.others.white,
              },
            ]}
          >
            {phone}
          </Text>
        </View>
        {isInvited ? (
        <Chips text="invited" type="border" size="small" style={{ marginLeft: 'auto'}} />
      ) : (
        <Chips text="invite" type="filled" size="small" style={{ marginLeft: 'auto' }} onPress={handlePress} />
      )}
      </View>
    </>
  );
}
