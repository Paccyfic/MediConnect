import { View, Text } from "react-native";
import React, { useContext } from "react";
import Typography from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { SvgXml } from "react-native-svg";
import { calendar } from "@/assets/icons/calendar1";
import { calendar2 } from "@/assets/icons/calendar2";
import { service } from "@/assets/icons/service";
import { wallet } from "@/assets/icons/wallet";
import { close } from "@/assets/icons/close";
import { ThemeContext } from "@/ctx/ThemeContext";

interface Props {
  title: string;
  description: string;
  createdAt: Date;
  type:
    | "appointment_changed"
    | "appointment_completed"
    | "appointment_booked"
    | "new_service"
    | "payment_setup"
    | "account_setup";
  viewed?: boolean;
}

export const icons = {
  accountSetupIcon: (
    <View
      style={{
        padding: 15,
        borderRadius: 100,
        backgroundColor: Colors.transparent.green,
      }}
    >
      <SvgXml xml={close} />
    </View>
  ),
  apppointmentScheduleIcon: (
    <View
      style={{
        padding: 15,
        borderRadius: 100,
        backgroundColor: Colors.transparent.green,
      }}
    >
      <SvgXml xml={calendar} />
    </View>
  ),
  appointmentCompletionIcon: (
    <View
      style={{
        padding: 15,
        borderRadius: 100,
        backgroundColor: Colors.transparent.blue,
      }}
    >
      <SvgXml xml={calendar2} />
    </View>
  ),
  infoIcon: (
    <View
      style={{
        padding: 15,
        borderRadius: 100,
        backgroundColor: Colors.transparent.yellow,
      }}
    >
      <SvgXml xml={service} />
    </View>
  ),
  creditCardConnectedIcon: (
    <View
      style={{
        padding: 15,
        borderRadius: 100,
        backgroundColor: Colors.transparent.blue,
      }}
    >
      <SvgXml xml={wallet} />
    </View>
  ),
};

export default function NotificationListing({
  title,
  description,
  createdAt,
  type,
  viewed,
}: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <View style={{ gap: 4, padding: 0 }}>
        <View
          style={{ flexDirection: "row", alignItems: "flex-start", gap: 15 }}
        >
          <View style={{}}>
            {type === "account_setup"
              ? icons.accountSetupIcon
              : type === "appointment_booked"
              ? icons.apppointmentScheduleIcon
              : type === "appointment_changed"
              ? icons.apppointmentScheduleIcon
              : type === "appointment_completed"
              ? icons.appointmentCompletionIcon
              : type === "new_service"
              ? icons.infoIcon
              : icons.creditCardConnectedIcon}
          </View>
          <View
            style={{
              gap: 4,
            }}
          >
            <Text
              style={[
                Typography.bold.large,
                {
                  color:
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white,
                },
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                Typography.medium.small,
                {
                  color:
                    theme === "light"
                      ? Colors.grayScale._700
                      : Colors.grayScale._400,
                },
              ]}
            >
              {createdAt
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "") +
                " | " +
                createdAt
                  .toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(" ", "")}
            </Text>
          </View>
          {!viewed && (
            <View
              style={{
                borderRadius: 8,
                backgroundColor: Colors.main.primary._500,
                marginLeft: "auto",
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  color: Colors.others.white,
                }}
              >
                New
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[
            Typography.medium.medium,
            {
              color:
                theme === "light"
                  ? Colors.grayScale._700
                  : Colors.grayScale._400,
              paddingVertical: 1,
            },
          ]}
        >
          {description.trim()}
        </Text>
      </View>
    </>
  );
}
