import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView,Alert } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { ThemeContext } from "@/ctx/ThemeContext";
import Typography from "@/constants/Typography";
import DatePicker from "@/components/UI/DatePicker";
import Tag from "@/components/UI/Tags/Tag";
import { FlatList } from "react-native";
import Button from "@/components/UI/Button";
import Chips from "@/components/UI/ChipsComponent";
import SelectHour from "@/components/SelectHour";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function BookingAppointment() {
  const { theme } = useContext(ThemeContext);
    const [timeSlots, setTimeSlots] = useState([""]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [availableTimeSlots,setAvailbaleTimeSlots]=useState<string[]>([])
  const [errorMessage,setErrorMessage]=useState<string>("")
  const { id } = useLocalSearchParams()
 

  const appointmentTable = "appointment"

  
  

  const generateTimeSlots = () => {
    let times = [];
    for (let hour = 9; hour <= 14; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourFormat = hour < 12 ? "AM" : "PM";
        const formattedHour = hour <= 12 ? hour : hour - 12;
        const time = `${formattedHour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${hourFormat}`;
        times.push(time);
      }
    }
    return setTimeSlots(times);
  };
  const convertTo12HourFormat = (time24: string) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours < 12 ? "AM" : "PM";
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  };
  const fetchBookedSlots = async (id: string, date: string) => {
    const { data, error } = await supabase
      .from(appointmentTable)
      .select("time")
      .eq("doctor_id", id)
      .eq("date", date)
    if (error) {
      
      return []
    }
    return data.map((appointment)=>convertTo12HourFormat(appointment.time))  
    
  }

  useEffect(() => {
    generateTimeSlots();
  }, []);

  useEffect(() => {
    const updateAvailableTimeSlots = async () => {
      if (selectedDate) {
        const bookedSlots = await fetchBookedSlots(id as string, selectedDate)
        
        const availableSlots = timeSlots.filter((slot) => !bookedSlots.includes(slot))
       
        setAvailbaleTimeSlots(availableSlots)
      }
    }
    updateAvailableTimeSlots()
   
  },[selectedDate,id,timeSlots])

  
  const handleNextPress = () => {
    if (!selectedHour || !selectedDate) {
      Alert.alert("Please select both date and an hour")
      return;
    }
    setErrorMessage("")
    router.push({
      pathname: "(app)/ActionMenu/Booking/Select-package",
      params: { Doctor_id: id, hour: selectedHour, date: selectedDate },
    });
  }

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor:
          theme === "light" ? Colors.others.white : Colors.dark._1,
      }}
     
    >
      <View style={{}}>
        <View
          style={{
            gap: 20,
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 10 }}>
            <Text
              style={[
                Typography.bold.xLarge,
                {
                  color:
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white,
                },
              ]}
            >
              Select Date
            </Text>
            <DatePicker onChange={setSelectedDate}  />
          </View>

          <View style={{ gap: 10 }}>
            <Text
              style={[
                Typography.bold.xLarge,
                {
                  color:
                    theme === "light"
                      ? Colors.grayScale._900
                      : Colors.others.white,
                },
              ]}
            >
              Select Hour
            </Text>
            <SelectHour timeSlots={availableTimeSlots} onChange={setSelectedHour} />
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: "auto",
          marginBottom: 20,
        }}
      >
        <Button
          title="Next"
          onPress={handleNextPress}
        />
      </View>
    </View>
  );
}
