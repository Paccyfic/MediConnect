import SelectPaymentCardListing from "@/components/Profile/SelectedPaymentCardListing";
import Button from "@/components/UI/Button";
import {
  applePayDark,
  applePayLight,
  googlePay,
  masterCardDark,
  masterCardLight,
  paypal,
} from "@/components/UI/Icons";
import PaymentChooseContainer from "@/components/UI/PaymentChooseContainer/Index";
import { Colors } from "@/constants/Colors";
import { PaymentMethods } from "@/constants/PaymentMethods";
import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext } from "react";
import { ScrollView, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function Payment() {
  const { theme } = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._1,
      }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        height: "100%",
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._1,
        paddingVertical: 20,
      }}
    >
      <View style={{ height: "100%", gap: 20 }}>
        <SelectPaymentCardListing
          icon={() => {
            return <SvgXml xml={paypal} />;
          }}
          title="Paypal"
        />
        <SelectPaymentCardListing
          icon={() => {
            return <SvgXml xml={googlePay} />;
          }}
          title="Google Pay"
        />
        <SelectPaymentCardListing
          icon={() => {
            return (
              <SvgXml xml={theme === "light" ? applePayLight : applePayDark} />
            );
          }}
          title="Apple Pay"
        />
        <SelectPaymentCardListing
          icon={() => {
            return (
              <SvgXml
                xml={theme === "light" ? masterCardLight : masterCardDark}
              />
            );
          }}
          title="•••• •••• •••• •••• 4679"
        />
        <SelectPaymentCardListing
          icon={() => {
            return (
              <SvgXml
                xml={theme === "light" ? masterCardLight : masterCardDark}
              />
            );
          }}
          title="•••• •••• •••• •••• 2766"
        />
        <SelectPaymentCardListing
          icon={() => {
            return (
              <SvgXml
                xml={theme === "light" ? masterCardLight : masterCardDark}
              />
            );
          }}
          title="•••• •••• •••• •••• 3892"
        />
        <Button
          title="Add New Card"
          onPress={() => {}}
          backgroundColor={Colors.main.primary._500}
          shadowColor={Colors.main.primary._500}
          style={{ marginTop: "auto" }}
        />
      </View>
    </ScrollView>
  );
}
