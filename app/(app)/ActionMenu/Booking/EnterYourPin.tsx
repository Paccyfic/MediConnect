import { Text } from "@/components/Themed";
import { LeftArrow } from "@/components/UI/Icons";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { useContext, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { router } from "expo-router";
import { useModal } from "@/ctx/ModalContext";
import { ThemeContext } from "@/ctx/ThemeContext";
import Button from "@/components/UI/Button";
import React from "react";
import { supabase } from "@/lib/supabase";

export default function EnterYourPin() {
  const [isDark, setIsDark] = useState(false);
  const modal = useModal();
  const {
    doctor_id,
    hour,
    date,
    packageTitle,
    packagePrice,
    problem,
    user_id,
    patient_id,
    duration,
  } = useLocalSearchParams();

  const { theme, changeTheme } = useContext(ThemeContext);
  async function bookAppointment() {
    const { error } = await supabase
      .from("appointment")
      .insert({
        doctor_id: doctor_id,
        time: hour,
        date: date,
        package: packageTitle,
        price: packagePrice,
        illness_descr: problem,
        user_id: patient_id,
        duration: duration,
      });
    if (error) {
      console.error("Error booking appointment:", error);
    }
  }
  console.log(
    "this is from lastpage",
    doctor_id,
    hour,
    packageTitle,
    packagePrice,
    problem
  );

  function successBooking() {
    router.push("ActionMenu");
    modal.hide();
  }
  async function handlePIN() {
    await bookAppointment();
    modal.show({
      children: (
        <View
          style={{
            padding: 40,
            alignItems: "center",
            gap: 20,
            borderRadius: 48,
            backgroundColor:
              theme === "light" ? Colors.others.white : Colors.dark._2,
          }}
        >
          <Image source={require("@/assets/images/calendarmodal.png")} />
          <View
            style={{
              gap: 20,
              backgroundColor:
                theme === "light" ? Colors.others.white : Colors.dark._2,
            }}
          >
            <Text
              style={[
                Typography.heading._4,
                {
                  color: Colors.main.primary._500,
                  textAlign: "center",
                },
              ]}
            >
              Congratulations!
            </Text>
            <Text
              style={[
                Typography.regular.large,
                {
                  textAlign: "center",
                  color:
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white,
                },
              ]}
            >
              Appointment successfully booked. You will receive a notification
              and the doctor you selected will contact you.
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
            <Button title="View Appointment" onPress={successBooking} />
            <TouchableOpacity
              onPress={() => {
                router.push("ActionMenu");
                modal.hide();
              }}
              style={{
                backgroundColor:
                  theme === "light" ? Colors.main.primary._100 : Colors.dark._3,
                borderRadius: 100,
                padding: 18,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  Typography.bold.large,
                  {
                    color:
                      theme === "light"
                        ? Colors.main.primary._500
                        : Colors.others.white,
                  },
                ]}
              >
                cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }

  return (
    <>
      <View style={isDark ? styles.containerdark : styles.container}>
        <View style={isDark ? styles.headerdark : styles.header}>
          <Pressable onPress={() => router.back()}>
            <LeftArrow
              fillColor={isDark ? Colors.others.white : Colors.grayScale._900}
            />
          </Pressable>
          <Text
            style={[
              Typography.heading._4,
              { color: isDark ? Colors.others.white : Colors.grayScale._900 },
            ]}
          >
            Enter Your Pin
          </Text>
        </View>
        <View style={{ gap: 60, alignItems: "center" }}>
          <Text
            style={[
              Typography.medium.xLarge,
              { color: isDark ? Colors.others.white : Colors.grayScale._900 },
            ]}
          >
            Enter your PIN to confirm appointment
          </Text>
          <View style={styles.inputs}>
            <OtpInput
              numberOfDigits={4}
              autoFocus={false}
              theme={{
                pinCodeContainerStyle: {
                  width: 83,
                  height: 61,
                  backgroundColor: isDark
                    ? Colors.dark._2
                    : Colors.grayScale._50,
                  borderRadius: 16,
                  borderColor: isDark ? Colors.dark._3 : Colors.grayScale._200,
                  borderWidth: 1,
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
                },
                pinCodeTextStyle: {
                  color: isDark ? Colors.others.white : Colors.grayScale._900,
                },
              }}
            />
          </View>
        </View>
        <Button
          title="Continue"
          onPress={handlePIN}
          style={{ width: "100%" }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  inputs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    marginTop: 60,
    backgroundColor: "transparent",
  },
  container: {
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
    backgroundColor: Colors.others.white,
    flex: 1,
    padding: 20,
  },

  headerdark: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    marginTop: 60,
    backgroundColor: "transparent",
  },
  containerdark: {
    justifyContent: "space-between",
    gap: 20,
    backgroundColor: Colors.dark._1,
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
});
