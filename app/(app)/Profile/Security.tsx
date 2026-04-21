import SwitchNotificationListing from "@/components/Profile/SwitchNotificationListing";
import Button from "@/components/UI/Button";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";

export default function Security() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
        }}
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View
          style={{
            gap: 30,
            paddingHorizontal: 20,
            paddingVertical: 20,
            height: "100%",
          }}
        >
          <SwitchNotificationListing title="Remember me" value={true} />
          <SwitchNotificationListing title="Face ID" />
          <SwitchNotificationListing title="Biometric ID" value={true} />
          <SwitchNotificationListing
            title="Google Authenticator"
            value={true}
          />

          <View style={{ gap: 15 }}>
            <Button
              title="Change PIN"
              backgroundColor={Colors.main.primary._100}
              textColor={{ color: Colors.main.primary._500 }}
              onPress={() => {}}
            />
            <Button
              title="Change Password"
              backgroundColor={Colors.main.primary._100}
              textColor={{ color: Colors.main.primary._500 }}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
