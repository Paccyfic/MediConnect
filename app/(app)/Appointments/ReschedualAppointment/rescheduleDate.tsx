import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/ctx/ThemeContext";
import { StatusBar } from "expo-status-bar";
import Typography from "@/constants/Typography";
import { useModal } from "@/ctx/ModalContext";
import { LeftArrow, LoadingIcon } from "@/components/UI/Icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Chips from "@/components/UI/ChipsComponent";
export default function RescheduleAppointment() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const modal = useModal();

  const handleTimeSlotPress = ({ time }: { time: any }) => {
    setSelectedTime(time === selectedTime ? null : time);
    console.log(time);
  };
  console.log(selectedTime);
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 9; hour <= 14; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourFormat = hour < 12 ? "AM" : "PM";
        const formattedHour = hour <= 12 ? hour : hour - 12;
        const time = `${formattedHour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${hourFormat}`;
        timeSlots.push(
         
          <Chips key={time} type={selectedTime === time?"filled":"border"} size="large" text={time} onPress={() => setSelectedTime(time)} style={{ paddingHorizontal:5, width:'30%',marginRight:5}} />
        );
      }
    }
    return timeSlots;
  };
  
  function handlebackhome(){
    modal.hide();
    router.push('/(app)/Appointments');
  }

  function handleDate(select: string) {
    setSelectedDate(select);
    console.log(select);
  }

  const ios = Platform.OS === "ios";

  async function handlemodal() {
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
              Rescheduling Success!
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
              Appointment successfully changed. You will receive a notification
              and the doctor you selected will contact you.
            </Text>
            <TouchableOpacity style={styles.btn} onPress={handlebackhome}>
              <Text
                style={[Typography.bold.large, { color: Colors.others.white }]}
              >
                View Appointment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={modal.hide}
              style={{
                backgroundColor: theme === "light"
                ? Colors.main.primary._100:Colors.dark._3,
                borderRadius: 100,
                padding: 18,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  Typography.bold.large,
                  {  color:theme === "light" ? Colors.main.primary._500:Colors.others.white },
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
    <View style={{ flex: 1, backgroundColor: theme === "light" ? Colors.others.white : Colors.dark._1, }}>
      <SafeAreaView style={{ marginBottom: ios ? 10 : 50 }}>
        <StatusBar style="dark" />
      </SafeAreaView>
      <View style={{ flex: 1, justifyContent: "space-around"}}>
        <View
          style={{
            backgroundColor:
              theme === "light" ? Colors.others.white : Colors.dark._1,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
              paddingLeft: 20,
              
              backgroundColor:
                theme === "light" ? Colors.others.white : Colors.dark._1,
            }}
          >
             <LeftArrow
            fillColor={
              theme === "dark" ? Colors.others.white : Colors.grayScale._900
            }
          />
            <Text
              style={[Typography.heading._4,{color:theme === 'light'? Colors.grayScale._900: Colors.others.white}]}
            >
              Reschedule Appointment
            </Text>
          </Pressable>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 30 }}
          >
            <View
              style={{
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View style={{ gap: 10 }}>
                <Text style={[Typography.bold.xLarge,{color:theme === 'light'? Colors.grayScale._900: Colors.others.white}]}>Select Date</Text>
                <View style={{ borderRadius: 20 }}>
                  <DatePicker
                    onSelectedChange={(date) => handleDate(date)}
                    mode="calendar"
                    options={{
                      backgroundColor: theme === 'light'? Colors.transparent.blue : Colors.dark._2 ,
                      textHeaderColor:theme === 'light'? Colors.grayScale._900: Colors.others.white,
                      textDefaultColor: theme === 'light'? Colors.grayScale._900: Colors.grayScale._300,
                      selectedTextColor: Colors.others.white,
                      mainColor: "#246BFD",
                      textSecondaryColor: theme === 'light'? Colors.grayScale._900: Colors.others.white,
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                    current="2020-07-13"
                    style={{
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View style={{ gap: 10 }}>
                  <Text style={[Typography.bold.xLarge,{color: theme === 'light'? Colors.grayScale._900: Colors.others.white}]}>Select Hour</Text>
                  <View style={styles.change}>{generateTimeSlots()}</View>
                </View>
              </View>

              <TouchableOpacity onPress={handlemodal} style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hour: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
  change: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap:10,
    
    
  },
  button: {
    flexBasis: "30%",
    borderColor: Colors.main.primary._500,
    borderWidth: 2,
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: "1%",
    width:118,
    height:45
  },
  buttonSelected: {
    backgroundColor: Colors.main.primary._500,
    borderWidth: 0,
    color: "white",
  },
  buttonText: {
    color: Colors.main.primary._500,
    padding: 3,
    alignSelf: "center",
  },

  buttonTextSelected: {
    color: "white",
  },
  btn: {
    backgroundColor: Colors.main.primary._500,
    textAlign: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 100,
    marginTop: 10,
  },
  btnText: {
    textAlign: "center",
    color: "white",
  },
});
