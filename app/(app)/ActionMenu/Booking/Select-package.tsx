import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router,useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "@/ctx/ThemeContext";
import Typography from "@/constants/Typography";
import DropDown from "@/components/UI/DropDown";
import { SvgXml } from "react-native-svg";
import {
  chatIcon,
  clockIcon,
  lightClockIcon,
  phoneIcon,
  videoIcon,
} from "@/constants/icon";
import PackagesContainer from "@/components/PackagesContainer";
import Button from "@/components/UI/Button";
import { StatusBar } from "expo-status-bar";

const SelectPackage = () => {
  const { theme } = useContext(ThemeContext);
  const { Doctor_id, hour, date,patient_id } = useLocalSearchParams()
  const [selectedPackageTitle, setSelectedPackageTitle] = useState<{ title: string, price: string }>({ title: "Messaging", price: "Rwf20" })
  const [selectedDuration, setSelectedDuration] = useState<string>("1 hour")
  const handleNextPress = () => {
    if (!selectedPackageTitle||!selectedDuration) {
      Alert.alert("Please select both Duration and package")
      return;
    }
    
    router.push({
      pathname: "ActionMenu/Booking/Patient-details",
      params:{ Doctor_id:Doctor_id,hour:hour,date:date,packageTitle:selectedPackageTitle.title,packagePrice:selectedPackageTitle.price,patient_id:patient_id,duration: selectedDuration,},
    });
  }

  const packages = [
    {
      id: "0",
      title: "Messaging",
      description: "Chat messages with doctor",
      price: "Rwf20",
      icon: () => <SvgXml xml={chatIcon} />,
    },
    {
      id: "1",
      title: "Voice Call",
      description: "Voice call with doctor",
      price: "Rwf40",
      icon: () => <SvgXml xml={phoneIcon} />,
    },
    {
      id: "2",
      title: "Video Call",
      description: "Video call with doctor",
      price: "Rwf60",
      icon: () => <SvgXml xml={videoIcon} />,
    },
  ];
  
 
  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <ScrollView
        style={{
          backgroundColor: theme === "light" ? "#FFFFFF" : "#181A20",
          width: "100%",
          paddingVertical: 20,
          flex: 1,
        }}
        contentContainerStyle={{
          gap: 30,
          flexGrow: 1,
        }}
      >
        <View style={{ gap: 20, paddingHorizontal: 20 }}>
          <Text
            style={[
              Typography.bold.xxLarge,
              {
                color: theme === "light" ? "#212121" : "#FFFFFF",
              },
            ]}
          >
            Select Duration
          </Text>
          <DropDown
            data={[
              { label: "1 hour", value: "1 hour" },
              { label: "30 minutes", value: "30 minutes" },
            ]}
            leftIcon={() => (
              <SvgXml xml={theme === "light" ? clockIcon : lightClockIcon} />
            )}
           onSelect={(value) => setSelectedDuration(value)}
          />
        </View>

        <View style={{ gap: 15 }}>
          <Text
            style={[
              Typography.bold.xxLarge,
              {
                color: theme === "light" ? "#212121" : "#FFFFFF",
                paddingHorizontal: 20,
              },
            ]}
          >
            Select Package
          </Text>

          <View>
            
            <PackagesContainer
              data={packages}
              onPackageSelect={(title, price) => setSelectedPackageTitle({ title, price })}
            
            
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            marginTop: "auto",
          }}
        >
          <Button
           title="Next" 
          onPress={handleNextPress}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default SelectPackage;
