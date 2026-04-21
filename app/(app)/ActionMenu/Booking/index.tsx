import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const index = () => {
  useEffect(() => {
    router.push("/(app)/Booking/SelectPayment");
  }, []);
  return (
    <View>
      <Text>Booking Index </Text>
    </View>
  );
};

export default index;
