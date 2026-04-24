import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native";
import { ThemeContext } from "@/ctx/ThemeContext";
import Typography from "@/constants/Typography";
import Button from "@/components/UI/Button";
import { useEffect } from "react";
import { router } from "expo-router";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { supabase } from "@/lib/supabase";
import { useModal } from "@/ctx/ModalContext";

export default function SelectPayment() {
  const { theme } = useContext(ThemeContext);
  const [loggedEmail, setLoggedEmail] = useState<string>("");
  const {
    doctor_id,
    hour,
    date,
    packageTitle,
    packagePrice,
    problem,
    patient_id,
    duration,
  } = useLocalSearchParams();

  const modal = useModal();
  const flutterKey = process.env.EXPO_PUBLIC_FLUTTERWAVE_KEY ?? "";

  interface RedirectParams {
    status: "successful" | "cancelled";
    transaction_id?: string;
    tx_ref: string;
  }

  let num: number = duration === "30 minutes" ? 1 : 2;

  let price: number = 0;
  if (packagePrice === "Rwf20") price = 20;
  else if (packagePrice === "Rwf40") price = 40;
  else if (packagePrice === "Rwf60") price = 60;

  const total: number = price * num;

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("error fetching user");
      } else {
        setLoggedEmail(user?.email || "");
      }
    };
    fetchUser();
  }, []);

  async function bookAppointment() {
    try {
      await supabase.from("appointment").insert({
        doctor_id,
        time: hour,
        date,
        package: packageTitle,
        price: packagePrice,
        illness_descr: problem,
        user_id: patient_id,
        duration,
      });
    } catch (error) {
      console.log("Error while inserting data in booking ", error);
    }
  }

  const addNotification = async (doctorName: string) => {
    try {
      const { error } = await supabase.from("notifications").insert({
        title: "Appointment Booked",
        description: `You have successfully booked an appointment with Dr. ${doctorName}`,
        patient_id,
        type: "appointment_booked",
        doctor_id,
        viewed: false,
      });
      if (error) console.log("Error while inserting notification ", error);
    } catch (error) {
      console.log("Error while inserting notification ", error);
    }
  };

  const fetchDoctorName = async (doctorId: string) => {
    const { data, error } = await supabase
      .from("doctors")
      .select("first_name")
      .eq("id", doctorId)
      .single();
    if (error) return "";
    return data.first_name;
  };

  function successBooking() {
    modal.hide();
    router.push("/(app)/ActionMenu" as any);
  }

  const showSuccessfulModal = () => {
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
                { color: Colors.main.primary._500, textAlign: "center" },
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
            <Button title="View Appointment" onPress={successBooking} />
            <TouchableOpacity
              onPress={() => {
                modal.hide();
                router.push("/(app)/ActionMenu" as any);
              }}
              style={{
                backgroundColor:
                  theme === "light"
                    ? Colors.main.primary._100
                    : Colors.dark._3,
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
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  };

  const handleOnRedirect = async (data: RedirectParams) => {
    if (data.status === "successful") {
      await bookAppointment();
      if (typeof doctor_id === "string") {
        const doctorName = await fetchDoctorName(doctor_id);
        await addNotification(doctorName);
      }
      showSuccessfulModal();
    } else {
      alert("Payment failed or cancelled. Please try again.");
    }
  };

  const generateRef = (length: number): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `MC_${result}_${Date.now()}`;
  };

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <ScrollView
        style={{ backgroundColor: "white", flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
          gap: 20,
          paddingBottom: 20,
          paddingTop: 40,
        }}
      >
        <Text
          style={[
            Typography.heading._4,
            {
              color:
                theme === "light" ? Colors.grayScale._900 : Colors.others.white,
              textAlign: "center",
            },
          ]}
        >
          Complete Payment
        </Text>
        <Text
          style={[
            Typography.regular.large,
            {
              color:
                theme === "light" ? Colors.grayScale._700 : Colors.others.white,
              textAlign: "center",
            },
          ]}
        >
          Total amount: RWF {total}
        </Text>
        <Text
          style={[
            Typography.regular.medium,
            {
              color:
                theme === "light" ? Colors.grayScale._500 : Colors.others.white,
              textAlign: "center",
            },
          ]}
        >
          Confirm the payment by clicking the button below.
        </Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateRef(11),
              authorization: flutterKey,
              customer: {
                email: loggedEmail,
              },
              amount: total,
              currency: "RWF",
              payment_options: "card",
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}