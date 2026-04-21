import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "@/ctx/ThemeContext";
import DropDown from "@/components/UI/DropDown";
import Input from "@/components/UI/Input";
import Typography from "@/constants/Typography";
import TextArea from "@/components/UI/TextArea";
import Button from "@/components/UI/Button";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { err } from "react-native-svg";

const PatientDetails = () => {
  const [text, setText] = useState("");
  const [height, setHeight] = useState(40);
  const { theme, changeTheme } = useContext(ThemeContext);
  const {Doctor_id,hour,date,packageTitle,packagePrice,duration} = useLocalSearchParams()
  const [loggeduser, setLoggedUser] = useState<string>()
  const [profile, setProfile] = useState<any>(null)
  const [patient_id, setPatient_id] = useState<string>()
  const [selectedGender, setSelectedGender] = useState<string>()
  const [selectedAge,setSelectedAge]=useState<string>("")

  useEffect(() => {
    const fetchUser = async () => {
      
      const { data: { user },error } = await supabase.auth.getUser()
      if (error) {
        console.error("error fetching user")
      } else {
        setLoggedUser(user?.id)
      }
    }
    fetchUser()
   
  }, [loggeduser])
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loggeduser) {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq('auth_id', loggeduser)
          .single()
        if (error) {
          console.error("error while retrieving profile",error)
        } else {
          setProfile(data)
          setPatient_id(data.id)
          if (!data.age && data.date_of_birth) {
            const age = calculateAge(data.date_of_birth)
            setProfile((prevProfile:Date) => ({
              ...prevProfile,
              age:age
            }))
            setSelectedAge(age.toString() || '')
          } 
         
         
        }
        
        
      }
    }
    fetchUserProfile()
  }, [loggeduser])
  
  
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };
  
  const handleInputChange = (name: string, value: string) => {
    setProfile({ ...profile, [name]: value });
  };
  

   const handleNextPress = () => {
    if (!text) {
      Alert.alert("Please select all required data")
      
      return;
    }
    
    router.push({
      pathname: "/(app)/ActionMenu/Booking/reviewSummary",
      params:{doctor_id:Doctor_id,hour:hour,date:date,packageTitle:packageTitle,packagePrice:packagePrice,problem:text,user_id:loggeduser,patient_id:patient_id,duration:duration},
    });
  }

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <ScrollView
        style={{
          backgroundColor: theme === "light" ? "#FFFFFF" : "#181A20",
          width: "100%",
          padding: 20,
          flex: 1,
        }}
        contentContainerStyle={{
          gap: 20,
          flexGrow: 1,
        }}
      >
        <View style={{ flexDirection: "column", gap: 10 }}>
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
            Full Name
          </Text>
          <Input onChange={handleInputChange} placeholder="Full Names" value={`${profile?.first_name} ${profile?.last_name}`} name={`${profile?.first_name} ${profile?.last_name}`} />
        </View>

        <View style={{ flexDirection: "column", gap: 10 }}>
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
            Gender
          </Text>
          <Input onChange={handleInputChange} placeholder="Gender" value={`${profile?.gender}`}  />
          
        </View>

        <View style={{ flexDirection: "column", gap: 10 }}>
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
            Your Age
          </Text>
          <Input onChange={value => handleInputChange('age', value)} placeholder="Age" value={selectedAge}  />
         
        </View>

        <View style={{ flexDirection: "column", gap: 10 }}>
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
            Write Your Problem
          </Text>
         
          <TextArea text={text} onChangeText={setText} />
        </View>

        <View
          style={{
            justifyContent: "flex-end",
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

export default PatientDetails;

const styles = StyleSheet.create({});
