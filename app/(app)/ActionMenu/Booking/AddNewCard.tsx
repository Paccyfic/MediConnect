import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Keyboard,
  Image
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { LeftArrow } from "@/components/UI/Icons";
import Typography from "@/constants/Typography";
import { StatusBar } from "expo-status-bar";
import { Calendar, CalendarProps } from "react-native-calendars";
import DateTimePicker, {
  Event,
  AndroidEvent,
} from "@react-native-community/datetimepicker";
import { ThemeContext } from "@/ctx/ThemeContext";
import { SvgXml } from "react-native-svg";
import { Card } from "@/assets/images/Booking/Card";
import {
  Amazon,
  GreyCalendar,
  GreyScanner,
  MasterCard,
  Mocard,
  WhiteCalendar,
  WhiteScanner,
} from "@/components/Icons/Icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";

export default function AddNewCard() {
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState("");
  const [CVVNumber, setCVVNumber] = useState("");

  const { theme, changeTheme } = useContext(ThemeContext);

  const onDateChange = (event: Event | AndroidEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleCardNumberChange = (text: string) => {
    const numericText = text.replace(/\s/g, "");
    let formattedText = "";
    for (let i = 0; i < numericText.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedText += " ";
      }
      formattedText += numericText[i];
    }
    setCardNumber(formattedText);
  };

  const handleCVVChange = (text: string) => {
    if (text.length <= 3 && !(text.length > 4)) {
      setCVVNumber(text);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#181A20" : "white" },
      ]}
    >
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <View style={{ justifyContent: "center", alignItems: "center" }}>

        <View style={{ shadowColor: "#246BFD", elevation: 15 }}>
        <SvgXml xml={Card}/>

          <View
            style={{
              position: "absolute",
              top: "18%",
              left: "15%",
              flexDirection: "row",
              gap: 35,
            }}
          >
            <View style={{ gap: 30 }}>
              <Text style={[Typography.bold.xLarge, { color: "#FFFFFF" }]}>
                Mocard
              </Text>
              <Text
                style={[
                  Typography.bold.xLarge,
                  { color: "#FFFFFF", fontSize: 40 },
                ]}
              >
                •••• •••• •••• ••••
              </Text>
              <View style={{ flexDirection: "row", gap: 52 }}>
                <View style={{ gap: 4 }}>
                  <Text style={[Typography.medium.small, { color: "#FFFFFF" }]}>
                    Card Holder name
                  </Text>
                  <Text
                    style={[
                      Typography.semiBold.large,
                      { color: "#FFFFFF", fontSize: 20 },
                    ]}
                  >
                    •••• ••••
                  </Text>
                </View>
                <View style={{ gap: 4 }}>
                  <Text style={[Typography.medium.small, { color: "#FFFFFF" }]}>
                    Expiry date
                  </Text>
                  <Text
                    style={[
                      Typography.semiBold.large,
                      { color: "#FFFFFF", fontSize: 20 },
                    ]}
                  >
                    •••• / ••••
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ gap: 125.05 }}>
            <Image source={require('@/components/Icons/Amazon.png')}/>
              <Image source={require('@/components/Icons/TwoEllipse.png')}/>
            </View>
          </View>
        </View>

        <View style={styles.middlePart}>
          <Text
            style={[
              Typography.bold.xLarge,
              { color: theme === "dark" ? "white" : "#212121" },
            ]}
          >
            Card Name
          </Text>
          <View
            style={[
              styles.outerBack,
              { backgroundColor: theme === "dark" ? "#1F222A" : "#FAFAFA" },
            ]}
          >
            <TextInput
              placeholder="Andrew Ainsley"
              placeholderTextColor={theme === "dark" ? "white" : "#212121"}
              style={[
                Typography.semiBold.medium,
                { color: theme === "dark" ? "white" : "black" },
              ]}
              keyboardAppearance={theme === "dark" ? "dark" : "default"}
            />
          </View>
          <Text
            style={[
              Typography.bold.xLarge,
              { color: theme === "dark" ? "white" : "#212121" },
            ]}
          >
            Card Number
          </Text>

          <View
            style={[
              styles.outerBack,
              { backgroundColor: theme === "dark" ? "#1F222A" : "#FAFAFA" },
            ]}
          >
            <TextInput
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              maxLength={19}
              placeholder="2672 4738 7837 7285"
              placeholderTextColor={theme === "dark" ? "white" : "black"}
              keyboardType="number-pad"
              style={[
                Typography.semiBold.medium,
                { color: theme === "dark" ? "white" : "#212121" },
              ]}
              keyboardAppearance={theme === "dark" ? "dark" : "default"}
            />
          </View>

          <View style={styles.belowMiddle}>
            <View style={styles.twoBelowMiddle}>
              <Text
                style={[
                  Typography.bold.xLarge,
                  { color: theme === "dark" ? "white" : "#212121" },
                ]}
              >
                Expiry Date
              </Text>

              <View
                style={[
                  styles.DateBorder,
                  { backgroundColor: theme === "dark" ? "#1F222A" : "#FAFAFA" },
                ]}
              >
                <Text
                  style={[
                    Typography.semiBold.medium,
                    { color: theme === "dark" ? "white" : "#212121" },
                  ]}
                >
                  {date.toLocaleDateString()}
                </Text>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    style={{
                      backgroundColor: theme === "dark" ? "black" : "#212121",
                    }}
                  />
                )}

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <SvgXml
                    xml={theme === "dark" ? WhiteCalendar : GreyCalendar}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.twoBelowMiddle}>
              <Text
                style={[
                  Typography.bold.xLarge,
                  { color: theme === "dark" ? "white" : "#212121" },
                ]}
              >
                CVV
              </Text>
              <View
                style={[
                  styles.outerBorder,
                  { backgroundColor: theme === "dark" ? "#1F222A" : "#FAFAFA" },
                ]}
              >
                <TextInput
                  onChangeText={handleCVVChange}
                  placeholder="699"
                  keyboardType="number-pad"
                  style={[
                    Typography.semiBold.medium,
                    { color: theme === "dark" ? "#FFFFFF" : "#212121" },
                  ]}
                  placeholderTextColor={
                    theme === "dark" ? "#FFFFFF" : "#212121"
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.Button} onPress={() => router.push('(app)/ActionMenu/Booking/SelectPayment')}>
          <Text style={[Typography.bold.large, { color: "#FFFFFF" }]}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  DateBorder: {
    width: 170,
    height: 56,
    paddingLeft: 20,
    paddingTop: 20,
    borderRadius: 16,
    flexDirection: "row",
    gap: 15,
  },
  outerBorder: {
    width: 170,
    height: 56,
    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 16,
  },
  outerBack: {
    width: 360,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    paddingLeft: 20,
  },
  Button: {
    width: 355,
    height: 58,
    borderRadius: 100,
    backgroundColor: "#246BFD",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#246BFD",
    elevation: 7,
  },
  twoBelowMiddle: {
    gap: 20,
  },
  belowMiddle: {
    gap: 15,
    flexDirection: "row",
  },
  middlePart: {
    gap: 20,
  },
  overThreeComp: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingLeft: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingLeft: 24,
    paddingBottom: 2,
    paddingRight: 24,
    paddingTop: 0,
    gap: 44,
  },
  twoComp: {
    flexDirection: "row",
    gap: 20,
  },
});
