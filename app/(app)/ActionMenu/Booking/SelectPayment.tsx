import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native";
import { ThemeContext } from "@/ctx/ThemeContext";
import Typography from "@/constants/Typography";
import Button from "@/components/UI/Button";
import { useEffect } from "react";
import { PaymentMethods } from "@/constants/PaymentMethods";
import PaymentChooseContainer from "@/components/UI/PaymentChooseContainer/Index";
import { router } from "expo-router";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { supabase } from "@/lib/supabase";
import { useModal } from "@/ctx/ModalContext";
export default function SelectPayment() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [selected, setSelected] = useState(false);
  const [loggedEmail, setLoggedEmail] = useState<string>("");
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

  const modal = useModal();
  const flutterKey = process.env.EXPO_PUBLIC_FLUTTERWAVE_KEY ?? "";
  console.log("this is packageprice from slect Payment:", packagePrice);

  interface RedirectParams {
    status: "successful" | "cancelled";
    transaction_id?: string;
    tx_ref: string;
  }
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

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("error fetching user");
      } else {
        setLoggedEmail(user?.email || "logged Email");
      }
    };
    fetchUser();
  }, [loggedEmail]);
  async function bookAppointment() {
    try {
      const { error } = await supabase.from("appointment").insert({
        doctor_id: doctor_id,
        time: hour,
        date: date,
        package: packageTitle,
        price: packagePrice,
        illness_descr: problem,
        user_id: patient_id,
        duration: duration,
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
        patient_id: patient_id,
        type: "appointment_booked",
        doctor_id: doctor_id,
        viewed: false,
      });
      console.log("Notification will be pushed");
      if (error) {
        console.log("Error while inserting notification ", error);
      }
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

    if (error) {
      console.log("Error fetching doctor's name: ", error);
      return "";
    }

    return data.first_name;
  };
  function successBooking() {
    router.push("ActionMenu");
    modal.hide();
  }
  const showSuccefulModal = () => {
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
  };
  const handleOnRedirect = async (data: RedirectParams) => {
    if (data.status === "successful") {
      bookAppointment();
      if (typeof doctor_id === "string") {
        const doctorName = await fetchDoctorName(doctor_id);
        await addNotification(doctorName);
      }
      showSuccefulModal();
    } else {
      alert("Payment Failed or cancelled ,please try again");
    }
  };
  const generateRef = (length: number): string => {
    const characters = flutterKey;
    const charactersArray = characters.split("");
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersArray.length);
      result += charactersArray[randomIndex];
    }

    return result;
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
        }}
      >
        <Text
          style={[
            Typography.regular.large,
            {
              color:
                theme === "light" ? Colors.grayScale._900 : Colors.others.white,
            },
          ]}
        >
          Comfirm the payment by click the button below.
        </Text>
        <View
          style={{
            width: "100%",
            height: "70%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateRef(11),
              authorization: "FLWPUBK_TEST-3c390392d62e44fc5788cb0859823f05-X",
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
