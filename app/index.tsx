import React, { useContext } from "react";
import Loading from "@/app/spinner/Loading";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "@/ctx/ThemeContext";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { StatusBar } from "expo-status-bar";
import BookingAppointment from "./(app)/ActionMenu/Booking/BookingAppointment";
import Chips from "@/components/UI/ChipsComponent";

export default function SplashScreen() {
  const { theme, changeTheme } = useContext(ThemeContext);
  useEffect(() => {
    setTimeout(() => {
      router.push("onBoarding");
    },3000);
  }, []);
  
  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View>
            <View>
              <Image source={require("../assets/images/icon.png")} />
            </View>
          </View>

          <View>
            <Text
              style={[
                Typography.heading._1,
                {
                  color:
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white,
                },
              ]}
            >
              Medica
            </Text>
          </View>
        </View>

        <View style={styles.spin}>
          <Loading />
        </View>
      </View>
      {/* <BookingAppointment /> */}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  spin: {
    position: "absolute",
    bottom: 50,
  },
});
