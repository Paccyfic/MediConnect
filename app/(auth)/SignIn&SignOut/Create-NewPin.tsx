import { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { ThemeContext } from "@/ctx/ThemeContext";
import Button from "@/components/UI/Button";

const CreateNewPin = () => {
  const [isDark, setIsDark] = useState(false);
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <>
      <View
        style={{
          backgroundColor: theme === "light" ? "#FFFFFF" : "#181A20",
          height: "100%",
          padding: 30,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 250,
            height: 50,
          }}
        >
          <MaterialIcons
            name="arrow-back"
            size={25}
            style={{
              color: theme === "light" ? "#212121" : "#FFFFFF",
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: theme === "light" ? "#212121" : "#FFFFFF",
            }}
          >
            Create New PIN
          </Text>
        </Pressable>
        <View
          style={{
            height: 140,
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              paddingTop: 15,
              textAlign: "center",
              lineHeight: 26,
              fontSize: 15,
              fontWeight: "400",
              letterSpacing: 1,
              color: theme === "light" ? "#212121" : "#FFFFFF",
            }}
          >
            Add a PIN number to make your account {"\n"}
            more secure
          </Text>
        </View>
        <View
          style={{
            height: 170,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OtpInput
            numberOfDigits={4}
            autoFocus={false}
            secureTextEntry
            theme={{
              pinCodeContainerStyle: {
                width: 83,
                height: 61,
                backgroundColor: theme === "light" ? "#FAFAFA" : "#1F222A",
                borderRadius: 16,
                borderColor: theme === "light" ? "#EEEEEE" : "#35383F",
                borderWidth: 1,
                marginHorizontal: 2,
              },
              focusedPinCodeContainerStyle: {
                width: 83,
                height: 61,
                backgroundColor: Colors.transparent.blue,
                borderRadius: 16,
                borderColor: Colors.main.primary._500,
                borderWidth: 1,
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 32,
                paddingRight: 32,
                marginHorizontal: 2,
              },
              pinCodeTextStyle: {
                color: theme === "light" ? "#212121" : "#FAFAFA",
              },
            }}
          />
        </View>
        <Button
          title="Continue"
          onPress={() => {
            router.push("/(auth)/SignIn&SignOut/SetYourFingerPrint");
          }}
        />
      </View>
    </>
  );
};

export default CreateNewPin;

const styles = StyleSheet.create({
  body: {
    margin: 0,
    padding: 0,
  },
});
