import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/ctx/ThemeContext";
import { StatusBar } from "expo-status-bar";
import Typography from "@/constants/Typography";
import { SvgXml } from "react-native-svg";
import { circleWithDots } from "@/components/UI/icons/circleWithDots";
import { WhiteMenuCircle } from "@/components/UI/icons/WhiteMenuCircle";
import DoctorCard from "@/components/DoctorCard";
import { Call, CallWhiteIcon } from "@/components/Icons/Icons"
import { BackArrow, blackArrow } from "@/components/Icons/Icons";

interface PatientType{
  id: string
  name: string
  gender: "male" | "female"
  age: string
  problem: string,
  appointmentMethod: "Messaging" | "Voice Call" | "video call"
  appointmentDate:string
  time: string
  price: string
  paid: boolean,
}

function AppointmentMessaging() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const ios = Platform.OS === "ios";


  const PatientDetails: PatientType[] = [
    {
      id: "23",
      name: "Rhys manners",
      gender: "male",
      age: "23",
      problem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      appointmentMethod: "Voice Call",
      appointmentDate: "Today December 22,, 2022",
      time: "14:00 PM",
      price: "20",
      paid: true,
    },
  ];

  return (
    <View style={[{backgroundColor: theme === 'dark' ? '#181A20' : '#FFFFFF', flex: 1}]}>
      <SafeAreaView style={{ marginBottom: ios ? 10 : 40 }}>

        <StatusBar style={theme === "light" ? "dark" : "light"}/>
        
      </SafeAreaView>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 30,
            padding: 20,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 30,

            }}
          >

            <SvgXml xml={theme === 'dark' ? BackArrow : blackArrow } />

            <Text
              style={[Typography.heading._4,{
                fontSize: 24,
                fontWeight: "600",
                color: theme === 'dark' ? '#FFFFFF' : '#212121'
              }]}
            >
              My Appointment
            </Text>
          </Pressable>
          <View>
            <SvgXml xml={theme === 'dark' ? WhiteMenuCircle : circleWithDots} />
          </View>
        </View>
        <View style={{flex: 1, paddingBottom: 30}}>
          {PatientDetails &&
            PatientDetails.map((data: PatientType) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 0,
                    justifyContent: "space-between",
                  }}
                >
                  <DoctorCard />
                </View>
                <View style={{gap: 16}}>

                  <Text
                    style={[
                      Typography.heading._5,
                      {
                        color:
                          theme === "dark"
                            ? Colors?.others?.white
                            : Colors?.grayScale?._900,
                      },
                    ]}
                  >
                    Scheduled appointment
                  </Text>

                    <View style={{gap: 12}}>
                  <Text style={[Typography.regular.large, {color: theme === 'dark' ? '#E0E0E0' : '#212121'}]}>{data.appointmentDate}</Text>
                  <Text style={[Typography.regular.large, {color: theme === 'dark' ? '#E0E0E0' : '#212121'}]}>{data.time}</Text>
                    </View>
                </View>
                <View style={{gap: 16}}>
                  <Text
                    style={[
                      Typography.heading._5,
                      {
                        color:
                          theme === "dark"
                            ? Colors.others.white
                            : Colors.grayScale._900,
                      },
                    ]}
                  >
                    Patient Information
                  </Text>
                  <View style={{gap: 10 }}>
                    <Text style={[Typography.regular.large,{gap: 8,color: theme === 'dark' ? '#E0E0E0' : '#212121'}]}>
                      Full Name: <Text>{data?.name}</Text>
                    </Text>
                    <Text style={[Typography.regular.large,  {color: theme === 'dark' ? '#E0E0E0' : '#212121'}]}>
                      Gender: <Text>{data?.gender}</Text>
                    </Text>
                    <Text style={[Typography.regular.large, {color: theme === 'dark' ? '#E0E0E0' : '#212121'}]}>
                      Age: <Text>{data?.age}</Text>
                    </Text>
                    <Text style={[Typography.regular.large, {color: theme === 'dark' ? '#E0E0E0' : '#212121'}]}>
                      Problem: <Text>{data?.problem}</Text>
                    </Text>
                  </View>
                </View>
                <View style={{ gap: 20 }}>
                  <Text
                    style={[
                      Typography.heading._5,
                      {
                        color:
                          theme === "dark"
                            ? Colors.others.white
                            : Colors.grayScale._900,
                      },
                    ]}
                  >
                    Your Package
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 20,
                      borderRadius: 20,
                      backgroundColor: theme === 'dark' ? '#1F222A' : '#FFFFFF',
                      
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 30,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.transparent.blue,
                          padding: 20,
                          borderRadius: 100,
                        }}
                      >
                        <SvgXml xml={Call} />
                      </View>
                      <View style={{ gap: 5 }}>
                        <Text
                          style={[
                            Typography.heading._5,
                            {
                              color:
                                theme === "dark"
                                  ? Colors.others.white
                                  : Colors.grayScale._900,
                            },
                          ]}
                        >
                          {data.appointmentMethod}
                        </Text>
                        <Text style={[Typography.medium.small,{color: theme === 'dark' ? '#E0E0E0' : '#212121'}]}>Voice call with doctor</Text>
                      </View>
                    </View>
                    <View style={{ gap: 5 }}>
                      <Text
                        style={[
                          Typography.bold.xLarge,
                          {color: theme === 'dark' ? '#246BFD' : '#212121'},
                        ]}
                      >
                        ${data.price}
                      </Text>
                      <Text style={[{color: theme === 'dark' ? '#E0E0E0' : '#212121'}]}>{data.paid ? "(paid)" : "not paid"}</Text>
                    </View>
                  </View>
                </View>

                <Pressable
                onPress={()=> router.push("(app)/Appointments/VoiceCallAppointment/VoiceCallRinging")}
                  style={{
                    backgroundColor: Colors.main.primary._500,
                    borderRadius: 100,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      alignSelf: "center",
                      padding: 20,
                      gap: 20,
                    }}
                  >
                    <SvgXml xml={CallWhiteIcon} />
                    <Text
                      style={[
                        Typography.bold.large,
                        { color: Colors.others.white },
                      ]}
                    >
                      {data?.appointmentMethod}(
                      <Text>Start at {data?.time}</Text>)
                    </Text>
                  </View>
                </Pressable>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}

export default AppointmentMessaging;

