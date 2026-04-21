import { Text } from "@/components/Themed";
import {
  LeftArrow,
  masterCardDark,
  masterCardLight,
} from "@/components/UI/Icons";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { colors } from "react-native-elements";
import { Mastercard, Mastercarddark } from "@/components/UI/Icons";
import { flutter } from "@/components/UI/Icons";
import { ThemeContext } from "@/ctx/ThemeContext";
import { router } from "expo-router";
import Button from "@/components/UI/Button";
import React from "react";
import { ScrollView } from "react-native";
import HorizontalSeparator from "@/components/UI/HorizontalSeparator";
import PaymentChooseInputCard from "@/components/UI/PaymentChooseContainer/PaymentChooseInputCard";
import SelectPaymentCardListing from "@/components/Profile/SelectedPaymentCardListing";
import { useLocalSearchParams } from "expo-router";
import { SvgXml } from "react-native-svg";
import { supabase } from "@/lib/supabase";
import { LightleftArrow } from "@/assets/icons/left";
import { LeftArrowWhite } from "@/assets/icons/LeftArrowWhite";

export default function Reviewsummary() {
  const { theme, changeTheme } = useContext(ThemeContext);
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
  const [doctor, setDoctor] = useState<any>(null);
  const leftArrowIcon = theme === "dark" ? LeftArrowWhite : LightleftArrow;

  useEffect(() => {
    const fetchDoctordata = async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", doctor_id)
        .single();
      if (error) {
        console.log("error fetching doctor data on Review summary", error);
      } else {
        setDoctor(data);
      }
    };
    fetchDoctordata();
  }, [doctor_id]);
  console.log("this is packagePrice:", packagePrice);
  let num: number = 1;
  if (duration === "30 minutes") {
    num = 1;
  } else {
    num = 2;
  }
  let price: number = 0;
  if (packagePrice === "Rwf20") {
    price = 20;
  } else if (packagePrice === "Rwf40") {
    price = 40;
  } else if (packagePrice === "Rwf60") {
    price = 60;
  }
  const total: number = price * num;
  if (!doctor) {
    return <Text>Loading Doctor's data .........</Text>;
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
          height: "100%",
          flex: 1,
          width: "100%",
        }}
        contentContainerStyle={{
          gap: 10,
          flexGrow: 1,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() =>
              router.push("(app)/ActionMenu/Booking/SelectPayment")
            }
            style={{
              height: "100%",
              width: "12%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgXml xml={leftArrowIcon} />
          </Pressable>
          <View
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: theme === "dark" ? "white" : "#212121",
              }}
            >
              {doctor?.first_name ?? "Doctor"}
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <View
            style={{
              elevation: theme === "light" ? 20 : 0,
              shadowColor: Colors.grayScale._400,
              flexDirection: "row",
              gap: 15,
              backgroundColor:
                theme === "light" ? Colors.others.white : Colors.dark._2,
              padding: 15,
              borderRadius: 20,
            }}
          >
            <Image
              source={{ uri: doctor.image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />

            <View style={{ gap: 10, paddingVertical: 4 }}>
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
                {doctor.first_name} {doctor.last_name}
              </Text>
              <HorizontalSeparator
                color={
                  theme === "light" ? Colors.grayScale._200 : Colors.dark._3
                }
              />
              <Text
                style={[
                  Typography.medium.small,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._900
                        : Colors.grayScale._300,
                  },
                ]}
              >
                {doctor.specialization}
              </Text>
              <Text
                style={[
                  Typography.medium.small,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._900
                        : Colors.grayScale._300,
                  },
                ]}
              >
                {doctor.hospital_name}
              </Text>
            </View>
          </View>

          <View
            style={{
              elevation: theme === "light" ? 20 : 0,
              shadowColor: Colors.grayScale._400,
              gap: 15,
              backgroundColor:
                theme === "light" ? Colors.others.white : Colors.dark._2,
              borderRadius: 20,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  Typography.medium.medium,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.grayScale._300,
                  },
                ]}
              >
                Date & Hour
              </Text>
              <Text
                style={[
                  Typography.semiBold.large,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._900
                        : Colors.others.white,
                  },
                ]}
              >
                {hour}| {date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  Typography.medium.medium,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.grayScale._300,
                  },
                ]}
              >
                Package
              </Text>
              <Text
                style={[
                  Typography.semiBold.large,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._900
                        : Colors.others.white,
                  },
                ]}
              >
                {packageTitle}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  Typography.medium.medium,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.grayScale._300,
                  },
                ]}
              >
                Duration
              </Text>
              <Text
                style={[
                  Typography.semiBold.large,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._900
                        : Colors.others.white,
                  },
                ]}
              >
                {duration}
              </Text>
            </View>
          </View>

          <View
            style={{
              elevation: theme === "light" ? 20 : 0,
              shadowColor: Colors.grayScale._400,
              gap: 20,
              backgroundColor:
                theme === "light" ? Colors.others.white : Colors.dark._2,
              borderRadius: 20,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  Typography.medium.medium,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.grayScale._300,
                  },
                ]}
              >
                Amount
              </Text>
              <Text
                style={[
                  Typography.semiBold.large,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.grayScale._300,
                  },
                ]}
              >
                {packagePrice}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  Typography.medium.medium,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.grayScale._300,
                  },
                ]}
              >
                Duration ({duration})
              </Text>
              <Text
                style={[
                  Typography.semiBold.large,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.grayScale._300,
                  },
                ]}
              >
                {num} x {packagePrice}
              </Text>
            </View>

            <HorizontalSeparator
              color={theme === "light" ? Colors.grayScale._200 : Colors.dark._3}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  Typography.medium.medium,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.grayScale._300,
                  },
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  Typography.semiBold.large,
                  {
                    color:
                      theme === "light"
                        ? Colors.grayScale._700
                        : Colors.others.white,
                  },
                ]}
              >
                {total}
              </Text>
            </View>
          </View>

          <SelectPaymentCardListing
            icon={() => {
              return <SvgXml xml={theme === "light" ? flutter : flutter} />;
            }}
          />
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: "auto" }}>
          <Button
            title="Next"
            onPress={() =>
              router.push({
                pathname: "(app)/ActionMenu/Booking/SelectPayment",
                params: {
                  doctor_id: doctor_id,
                  hour: hour,
                  date: date,
                  packageTitle: packageTitle,
                  packagePrice: packagePrice,
                  problem: problem,
                  user_id: user_id,
                  patient_id: patient_id,
                  duration: duration,
                },
              })
            }
            style={{}}
          />
        </View>
      </ScrollView>
    </>
  );
}