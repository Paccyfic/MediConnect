import Typography from "@/constants/Typography";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "@/ctx/ThemeContext";
import { SvgXml } from "react-native-svg";
import { Success } from "@/assets/icons/Success";
import { router } from "expo-router";

interface PopupProps {
  message: string;
  bigMessage: string;
  show: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  message,
  show,
  onClose,
  bigMessage,
}) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  return (
    <View style={[styles.overlay, { display: show ? "flex" : "none" }]}>
      <View
        style={[
          styles.popup,
          {
            backgroundColor: theme === "dark" ? "#1F222A" : "#FFFFFF",
            borderRadius: 48,
            gap: 32,
            padding: 32,
          },
        ]}
      >
        <SvgXml xml={Success} />
        <Text
          style={[
            Typography.heading._4,
            { color: theme === "dark" ? "#246BFD" : "#246BFD" },
          ]}
        >
          {message}
        </Text>
        <Text
          style={[
            Typography.regular.large,
            { color: theme === "dark" ? "#FFFFFF" : "#212121" },
          ]}
        >
          {bigMessage}
        </Text>
        <TouchableOpacity
          onPress={() => router.push("Appointments")}
          style={styles.okButton}
        >
          <Text
            style={[
              Typography.bold.large,
              { color: theme === "dark" ? "#FFFFFF" : "#FFFFFF" },
            ]}
          >
            Ok
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: 340,
    height: 460,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  okButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#246BFD",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 276,
    height: 58,
  },
});

export default Popup;
