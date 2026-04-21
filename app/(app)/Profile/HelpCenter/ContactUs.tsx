import React from "react";
import {
  FacebookBlueIcon,
  HeadSetBlueIcon,
  InstagramBlueIcon,
  TwitterBlueIcon,
  WebsiteBlueIcon,
  WhatsappBlueIcon,
} from "@/assets/icons/Profile/Icons";
import ContactsListing from "@/components/Profile/ContactsListing";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/ctx/ThemeContext";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { openBrowserAsync } from "expo-web-browser";
import * as Linking from "expo-linking";

export default function ContactUs() {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView
      style={{
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._1,
        height: "100%",
      }}
      contentContainerStyle={{
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 20,
        paddingVertical: 20,
      }}
    >
      <View style={{ paddingHorizontal: 20, gap: 20 }}>
        <ContactsListing
          onPress={() => Linking.openURL("tel:+250723908534 ")}
          icon={() => <SvgXml xml={HeadSetBlueIcon} />}
          title="Customer Service"
        />
        <ContactsListing
          onPress={() => {
            Linking.openURL("whatsapp://send?text=hello&phone=+250782750607");
          }}
          icon={() => <SvgXml xml={WhatsappBlueIcon} />}
          title="Whatsapp"
        />
        <ContactsListing
          onPress={() => {
            openBrowserAsync("https://google.com");
          }}
          icon={() => <SvgXml xml={WebsiteBlueIcon} />}
          title="Website"
        />
        <ContactsListing
          onPress={() => {
            openBrowserAsync("https://facebook.com");
          }}
          icon={() => <SvgXml xml={FacebookBlueIcon} />}
          title="Facebook"
        />
        <ContactsListing
          onPress={() => {
            openBrowserAsync("https://twitter.com");
          }}
          icon={() => <SvgXml xml={TwitterBlueIcon} />}
          title="Twitter"
        />
        <ContactsListing
          onPress={() => {
            openBrowserAsync("https://instagram.com");
          }}
          icon={() => <SvgXml xml={InstagramBlueIcon} />}
          title="Instagram"
        />
      </View>
    </ScrollView>
  );
}
