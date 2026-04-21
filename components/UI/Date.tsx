import React from "react";

import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { View } from "../Themed";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";

export default function DateElement({
  item,
  disabled,
  selected,
  selectedDate,
  setSelectedDate,
}: {
  item: string;
  disabled?: boolean;
  setSelectedDate?: React.Dispatch<React.SetStateAction<number>>;
  selectedDate?: number;
  selected?: boolean;
}) {
  const { theme, changeTheme } = useContext(ThemeContext);
  return (
    <Pressable
      style={{
        flex: 1 / 7,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        setSelectedDate && setSelectedDate(parseInt(item));
      }}
      disabled={disabled}
    >
      <View
        style={{
          backgroundColor:
            selectedDate === parseInt(item)
              ? Colors.main.primary._500
              : "transparent",
          height: 30,
          width: 30,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          key={item}
          style={[
            Typography.medium.medium,
            {
              color:
                selectedDate === parseInt(item)
                  ? Colors.others.white
                  : !disabled
                  ? theme === "light"
                    ? Colors.grayScale._900
                    : Colors.grayScale._300
                  : Colors.grayScale._500,
              textAlign: "center",
            },
          ]}
        >
          {item}
        </Text>
      </View>
    </Pressable>
  );
}
