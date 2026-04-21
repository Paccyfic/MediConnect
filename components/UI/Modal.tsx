import { Image, useColorScheme } from "react-native";
import { Text, View } from "../Themed";
import { Svg } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import React, { useContext, useEffect, useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { AnimatedView } from "react-native-reanimated/lib/typescript/reanimated2/component/View";
import { ThemeContext } from "@/ctx/ThemeContext";
import { useModal } from "@/ctx/ModalContext";
import { LoadingIcon } from "./Icons";

export default function ModalContainer() {
  const { visible, content } = useModal();
  const [modalVisible, setModalVisible] = useState(false);
  const { theme, changeTheme } = useContext(ThemeContext);

  const slideDownValue = useSharedValue(400);
  const fadeInValue = useSharedValue(0);

  const duration = 2000;
  const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

  React.useEffect(() => {
    if (visible) {
      rotationValue.value = withRepeat(withTiming(1, { duration }), -1);
      slideDownValue.value = withTiming(0, { duration: 250 });
      fadeInValue.value = withTiming(1, { duration: 250 });
      setModalVisible(true);
    } else {
      rotationValue.value = withRepeat(withTiming(0, { duration }), -1);
      slideDownValue.value = withTiming(400, { duration: 250 });
      fadeInValue.value = withTiming(0, { duration: 250 });
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  }, [visible]);

  useEffect(() => {
    rotationValue.value = withRepeat(withTiming(1, { duration: 2000 }), -1);
  }, []);

  const rotationValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationValue.value * 360}deg` }],
  }));

  const ModalStyle = useAnimatedStyle(() => ({
    marginBottom: slideDownValue.value,
    opacity: fadeInValue.value,
  }));

  const backdropFadeIn = useAnimatedStyle(() => ({
    opacity: fadeInValue.value,
  }));

  return (
    <>
      {modalVisible && (
        <Animated.View
          style={[
            {
              position: "absolute",
              backgroundColor: "rgba(9, 16, 29, 0.5)",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
            },
            backdropFadeIn,
          ]}
        >
          <Animated.View
            style={[
              {
                backgroundColor:
                  theme === "light"
                    ? Colors.others.white
                    : Colors.grayScale._900,
                zIndex: 10,
                opacity: 1,
                borderRadius: 48,
              },
              ModalStyle,
            ]}
          >
            {content.children}
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
}
