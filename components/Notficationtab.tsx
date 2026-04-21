import React, { ReactElement } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";

import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext } from "react";

interface notificatioTabProps {
  IconComponet?: ReactElement;
  viewBackground?: string;
  notificationStatus?: string;
  timeFrame?: string;
  time?: string;
  description: string;
  btnVisibility?: string;
}

function Notficationtab({
  IconComponet,
  viewBackground,
  notificationStatus,
  timeFrame,
  time,
  description,
  btnVisibility,
}: notificatioTabProps) {
  const { theme, changeTheme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? styles.textDark : styles.textLight;
  const sentenceColor =
    theme === "dark" ? styles.sentenceDark : styles.sentenceLight;
  return (
    <SafeAreaView>
      <View style={styles.outer}>
        <View style={styles.LeftView}>
          <View style={[styles.IconView, { backgroundColor: viewBackground }]}>
            {IconComponet}
          </View>
          <View>
            <Text style={[styles.notificationStyle, textColor]}>
              {notificationStatus}
            </Text>
            <View style={styles.TimeView}>
              <Text style={[styles.timeStyle, sentenceColor]}>{timeFrame}</Text>
              <View style={styles.separateView}></View>
              <Text style={[styles.timeStyle, sentenceColor]}>{time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.btnView}>
          <Pressable style={[styles.btn, { display: btnVisibility }]}>
            <Text style={styles.btnText}>New</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text>{description}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Notficationtab;
const styles = StyleSheet.create({
  outer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "2%",
    justifyContent: "space-between",
  },
  textLight: {
    color: "#212121",
  },
  textDark: {
    color: "white",
  },
  sentenceDark: {
    color: "#E0E0E0",
  },
  sentenceLight: {
    color: "#424242",
  },
  TimeView: {
    marginTop: 9,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "70%",
    alignItems: "baseline",
  },
  LeftView: {
    width: "80%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    gap: 13,
  },
  notificationStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  IconView: {
    width: 50,
    height: 50,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  separateView: {
    height: 15,
    width: 2,
    backgroundColor: "#616161",
  },

  timeStyle: {
    color: "#616161",
    fontWeight: "300",
    fontSize: 16,
  },
  textStyle: {
    fontFamily: "Regular",
    fontSize: 12.7,
  },
  btn: {
    backgroundColor: "#246BFD",
    borderRadius: 10,
    width: 50,
    height: 30,
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnView: {
    width: "20%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnText: {
    color: "white",
  },
});
