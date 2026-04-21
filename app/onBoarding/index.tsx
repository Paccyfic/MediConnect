import React, { ReactElement, useContext, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  Image,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/ctx/ThemeContext";

import Paginator from "@/utils/Paginator";
import { StatusBar } from "expo-status-bar";
import Typography from "@/constants/Typography";
import { router } from "expo-router";
import { ScrollView } from "react-native";

const data = [
  {
    id: "1",
    image: require("@/assets/images/OnBoardingImages/firstLightImg.png"),
    darkImg: require("@/assets/images/OnBoardingImages/firstDarkImg.png"),
    text: "Thousands of doctors & experts to help your health!",
  },
  {
    id: "2",
    image: require("@/assets/images/OnBoardingImages/secondLightImg.png"),
    darkImg: require("@/assets/images/OnBoardingImages/secondDarkImg.png"),
    text: "Health checks & consultations easily anywhere anytime",
  },
  {
    id: "3",
    image: require("@/assets/images/OnBoardingImages/thirdLightImg.png"),
    darkImg: require("@/assets/images/OnBoardingImages/thirdDarkImg.png"),
    text: "Let's start living healthy and well with us right now!",
  },
];

const OnboardingComponent = ({}: {
  image: any;
  text: string;
  action: string;
  direction: any;
  children: React.ReactNode;
}) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const { width } = Dimensions.get("window");

  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
        justifyContent: "flex-end",
        gap: 20,
        paddingBottom: 20,
      }}
      style={{
        backgroundColor:
          theme === "dark" ? Colors.dark._1 : Colors.others.white,
      }}
    >
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={data}
          contentContainerStyle={{ flexGrow: 1, flexDirection: "row" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          renderItem={({ item }) => (
            <View
              style={{
                width: width,
                alignItems: "center",
                paddingHorizontal: 20,
                gap: 40,
              }}
            >
              <View>
                <Image source={theme === "dark" ? item.darkImg : item.image} />
              </View>
              <View>
                <Text
                  style={[
                    Typography.heading._2,
                    {
                      color:
                        theme === "light"
                          ? Colors.main.primary._500
                          : Colors.others.white,
                      textAlign: "center",
                    },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View
        style={{ padding: 20, alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ alignSelf: "center" }}>
          <Paginator data={data} scrollX={scrollX} />
        </View>
        <Pressable
          onPress={() => router.push("(auth)/SignIn&SignOut/LetsYouIn")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Get started</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.main.primary._500,
    textAlign: "center",
    padding: 18,
    borderRadius: 100,
    alignContent: "flex-end",
    marginHorizontal: 20,
    width: "100%",
  },

  btnText: {
    color: Colors.others.white,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingComponent;
