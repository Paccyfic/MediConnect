import { BlueDownIcon } from "@/assets/icons/Profile/Icons";
import Accordion from "@/components/UI/Accordion";
import Search from "@/components/UI/Search";
import TagsContainer from "@/components/UI/Tags";
import Tag from "@/components/UI/Tags/Tag";
import { Colors } from "@/constants/Colors";
import Typography from "@/constants/Typography";
import { ThemeContext } from "@/ctx/ThemeContext";
import React from "react";
import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SvgXml } from "react-native-svg";

export default function FAQ() {
  const [tags, setTags] = useState([
    "General",
    "Account",
    "Service",
    "Payment",
  ]);

  const [faqs, setFaqs] = useState([
    {
      id: "1",
      title: "What is Medica?",
      description:
        "Medica is a mobile application designed to facilitate online doctor appointments and consultations.",
    },
    {
      id: "2",
      title: "How to use Medica?",
      description:
        "As a users can create an account, log in, browse through various doctor specialties, schedule appointments, and communicate with healthcare professionals through voice calls, video calls, or messaging.",
    },
    {
      id: "3",
      title: "How do I cancel an appointment?",
      description:
        "If a user happen to cancel an appointment, they can do so by going to the appointment section and clicking on the cancel button.",
    },
    {
      id: "4",
      title: "How do I save the recording?",
      description:
        "THis feature is under development and will be available in the next update.",
    },
    {
      id: "5",
      title: "How do I exit the app?",
      description:
        "As a logged in user you can exit the app by clicking on the logout button in the profile section.",
    },
  ]);

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
          height: "100%",
        }}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 24,
          paddingVertical: 20,
        }}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}
        >
          <TagsContainer data={tags} />
        </ScrollView>

        <View
          style={{
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search onchange={() => {}} />
        </View>

        <View style={{ paddingHorizontal: 20, gap: 24 }}>
          {faqs.map((faq) => {
            return (
              <Accordion
                key={faq.id}
                title={faq.title}
                description={faq.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
