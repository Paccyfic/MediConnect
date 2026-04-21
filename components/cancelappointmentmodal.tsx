import React, {
    useRef,
    useEffect,
    useContext,
  } from "react";
  import {
    StyleSheet,
    Text,
    View,
    Animated,
    SafeAreaView,
  
  } from "react-native";
  import Typography from "@/constants/Typography";
  import Removebtn from "./Removebtn";
  import { Colors } from "@/constants/Colors";
  import { router } from "expo-router";
  import { ThemeContext } from "@/ctx/ThemeContext";
  interface CancelProps {
    visible: boolean;
    cancel: () => void;
    appointmentId: string | undefined;
  }
  
  function CancelAppointment({ visible, cancel , appointmentId}: CancelProps) {
    const { theme, changeTheme } = useContext(ThemeContext);

    const translateY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      if (visible) {
        Animated.timing(translateY, {
          toValue: -1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateY, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }, [visible]);
    if (!visible) return null;
    return (
      <SafeAreaView style={styles.overlay}>
        <Animated.View
          style={[
            styles.outer,
            {
              backgroundColor: theme === "dark" ? Colors.dark._1 : "white",
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [0, 300],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.inner}>
            <View style={styles.intro}>
              <Text style={[Typography.heading._4, { color: "#F75555" }]}>
                Cancel appointment
              </Text>
            </View>
            <View style={styles.horizontal}></View>
            <View style={styles.displayComponent}>
              <View style={styles.componentView}>
                <Text
                  style={[
                    Typography.medium.xLarge,
                    {
                      color: theme === "dark" ? "white" : Colors.grayScale._900,
                      textAlign: "center",
                    },
                  ]}
                >
                  Are you sure you want to cancel your appointment?
                </Text>
                <Text
                  style={[
                    Typography.medium.xLarge,
                    {
                      color: theme === "dark" ? "white" : Colors.grayScale._900,
                      textAlign: "center",
                    },
                  ]}
                >
                  Only 50% of the funds will be returned to your account.
                </Text>
              </View>
            </View>
            <View style={styles.horizontal}></View>
            <View style={styles.btnView}>
              <Removebtn
                action={cancel}
                backColor={theme === "dark" ? Colors.dark._3 : Colors.transparent.blue}
                text="Back"
                textColor={theme === "dark" ? "white" : "#246BFD"}
              />
              <Removebtn
                action={() =>
                  router.push({
                    pathname: "(app)/Appointments/CancelAppointment",
                    params: { appointmentId: appointmentId}
                  })
                }
                backColor="#246BFD"
                text="Yes,Cancel"
                textColor="white"
              />
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }
  
  export default CancelAppointment;
  
  const styles = StyleSheet.create({
    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(80, 85, 94, 0.8)",
      justifyContent: "flex-end",
      zIndex: 1000,
    },
    outer: {
      width: "100%",
      height: "40%",
      zIndex: 1000,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    intro: {
      width: "100%",
      height: 40,
      marginBottom: "1%",
      marginTop: "5%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    introText: {
      color: "#212121",
      fontWeight: "bold",
      fontSize: 20,
    },
    inner: {
      width: "90%",
    },
    displayComponent: {},
    btnView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    componentView: {
      width: "100%",
      height: 120,
      borderRadius: 20,
      display: "flex",
      textAlign: "center",
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000,
    },
    horizontal: {
      width: "100%",
      borderWidth: 0.1,
      borderColor: "#555555",
      marginBottom: "6%",
      backgroundColor: "#555555",
    },
  });
  