import { Pressable, Text, View } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import { Colors } from "@/constants/Colors";
import HorizontalSeparator from "./HorizontalSeparator";
import Typography from "@/constants/Typography";
import Button from "./Button";
import { ThemeContext } from "@/ctx/ThemeContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const SIZE = 120;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const TakeActionModal = forwardRef<BottomSheetRefProps, BottomSheetRefProps>(
  ({ children }, ref) => {
    const { theme, changeTheme } = useContext(ThemeContext);
    const offset = useSharedValue(100);
    const height = useSharedValue(0);
    const opacity = useSharedValue(0);
    const active = useSharedValue(false);

    const pan = Gesture.Pan()
      .onChange((event) => {
        if (event.changeY >= 0) {
          offset.value += event.changeY;
        }
      })
      .onFinalize((event) => {
        offset.value = withDecay({
          velocity: event.velocityX,
          rubberBandEffect: false,
          clamp: [-height.value + SIZE, 0],
        });
      });

    useEffect(() => {
      offset.value = withTiming(0, { duration: 1000 });
      opacity.value = withTiming(1, { duration: 1000 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    const scrollTo = useCallback((destination: number) => {
      "worklet";

      active.value = destination !== 0;
      offset.value = withSpring(destination, { damping: 50 });
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: offset.value }],
      opacity: opacity.value,
    }));

    return (
      <>
        <Pressable
          onPress={() => {
            scrollTo(0);
          }}
        >
          Click
        </Pressable>
        <GestureHandlerRootView
          style={{
            backgroundColor: "rgba(9, 16, 29, 0.5)",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
            }}
          >
            <Animated.View
              style={[
                {
                  backgroundColor:
                    theme === "light" ? Colors.others.white : Colors.dark._1,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  paddingBottom: 40,
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  // transform: [{ translateY: 200 }],
                },
                animatedStyles,
              ]}
            >
              <GestureDetector gesture={pan}>
                <View
                  style={{
                    padding: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        theme === "light"
                          ? Colors.grayScale._300
                          : Colors.dark._3,
                      height: 4,
                      width: 40,
                      borderRadius: 4,
                      alignSelf: "center",
                    }}
                  ></View>
                </View>
              </GestureDetector>

              <View
                style={{ paddingHorizontal: 20, alignItems: "center", gap: 20 }}
              >
                <Text
                  style={[
                    Typography.bold.xxLarge,
                    { color: Colors.status.error },
                  ]}
                >
                  Logout
                </Text>
                <HorizontalSeparator
                  color={
                    theme === "light" ? Colors.grayScale._300 : Colors.dark._3
                  }
                  width={"100%"}
                />
                <Text
                  style={[
                    Typography.bold.xLarge,
                    {
                      color:
                        theme === "light"
                          ? Colors.grayScale._800
                          : Colors.others.white,
                    },
                  ]}
                >
                  Are you sure you want to log out?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    gap: 20,
                  }}
                >
                  <View
                    style={{
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      backgroundColor={
                        theme === "light"
                          ? Colors.main.primary._100
                          : Colors.dark._3
                      }
                      title="Cancel"
                      textColor={{
                        color:
                          theme === "light"
                            ? Colors.main.primary._500
                            : Colors.others.white,
                      }}
                      onPress={() => {}}
                    />
                  </View>
                  <View
                    style={[
                      { flexGrow: 1 },
                      {
                        shadowColor: "red",
                        shadowOffset: { width: 6, height: 6 },
                        shadowOpacity: 1,
                        shadowRadius: 20,
                      },
                    ]}
                  >
                    <Button
                      backgroundColor={Colors.main.primary._500}
                      title="Yes. Logout"
                      shadowColor={Colors.main.primary._500}
                      onPress={() => {}}
                    />
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>
        </GestureHandlerRootView>
      </>
    );
  }
);

export default TakeActionModal;
