import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { ThemeContext } from "@/ctx/ThemeContext";
import { StatusBar } from "expo-status-bar";
import Typography from "@/constants/Typography";
import { SvgXml } from "react-native-svg";
import DoctorCard from "@/components/DoctorCard";
import { backArrowWhite } from "@/components/UI/icons/backArrow";
import { WhiteMenuCircle } from "@/components/UI/icons/WhiteMenuCircle";
import { MoreIcon } from "@/assets/icons/MoreCircleSvg";
import { backArrowBlackIcon } from '@/constants/icon'
import { supabase } from "@/lib/supabase";
import { CallWhiteIcon } from "@/components/Icons/Icons";
import { BlueVoiceCall } from "@/components/UI/icons/callIcon";


interface AppointmentType {
  [x: string]: any;
  name: string;
  specialization: string;
  hospital_name: string;
  time: string;
  package: string;
  date: string;
  price: string;
  paid: boolean;
  gender:string;
  patient_name:string;
  patient_age:string;
  problem:string;
  
}


function AppointmentVoiceCall() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const ios = Platform.OS === "ios";
  const [patientData, setPatientData] = useState(null);
  const [userData, setUserData] = useState<[]>([]);
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentType[]>([]);
  const [loggeduser, setLoggedUser] = useState<string>()
  const [patient_id,setPatient_id]=useState<string>()
  const [profile, setProfile] = useState<any>(null)
  const [doctorID, setDoctorsID] = useState<string>();
  const[ages, setAges] = useState<string>()
  const [showMore, setShowMore] = useState<boolean>(false);
 


  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from("appointment")
        .select("*")
        .eq("id", id);
      if (appointmentsError) {
        setIsLoading(false);
        console.error("Error fetching data:", appointmentsError);
        return;
      }

      const doctorIds = appointmentsData.map(appointment => appointment.doctor_id);
      setDoctorsID(doctorIds[0]);
const userIds = appointmentsData.map(appointment => appointment.user_id);

try {
  // Fetch doctor data
  const { data: doctorData, error: doctorsError } = await supabase
    .from("doctors")
    .select("*")
    .in("id", doctorIds);

  if (doctorsError) {
    setIsLoading(false);
    console.error("Error fetching doctors:", doctorsError);
    return;
  }

  // Fetch user data
  const { data: userData, error: usersError } = await supabase
    .from("patients")
    .select("*")
    .in("id", userIds);

  if (usersError) {
    setIsLoading(false);
    console.error("Error fetching users:", usersError);
    return;
  }

  const mergedData = appointmentsData.map(appointment => {
    const doctor = doctorData.find(doc => doc.id === appointment.doctor_id);
    const user = userData.find(usr => usr.id === appointment.user_id);
    return { ...appointment, doctor, user };
  });
  setIsLoading(true);
      setAppointment(mergedData);
} catch (error) {
  setIsLoading(false);
  console.error("Error fetching data:", error);
}

      
      
    }
    fetchData();
  }, [appointment]);

  

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
          
        }
              }
    }
    fetchUserProfile()
  }, [loggeduser])

  useEffect(() => {
    const calculateAge = () => {
      if (profile) {
        const today = new Date();
        const birthDate = new Date(profile?.date_of_birth);
        const age = today.getFullYear() - birthDate.getFullYear();
        setAges(age.toString())
      }
    }
    calculateAge()
  }, [profile])


  

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme === "dark" ? Colors.dark._1 : Colors.others.white,
      }}
    >
      <SafeAreaView style={{ marginBottom: ios ? 10 : 40 }}>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </SafeAreaView>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 30,
            padding: 20,
            backgroundColor:
              theme === "light" ? Colors.others.white : Colors.dark._1,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 30,
              backgroundColor:
                theme === "light" ? Colors.others.white : Colors.dark._1,
            }}
          >
            <SvgXml xml={theme === 'dark' ? backArrowWhite : backArrowBlackIcon } />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                color:
                  theme === "dark" ? Colors.others.white : Colors.others.black,
              }}
            >
              My Appointment
            </Text>
          </Pressable>
          <View>
            <SvgXml xml={theme === "dark" ? WhiteMenuCircle : MoreIcon} />
          </View>
        </View>
        <View style={{ flex: 1, paddingBottom: 30 }}>
          {appointment &&
            appointment.map((appointment, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  justifyContent: "space-around",
                  backgroundColor:
                    theme === "light" ? Colors.others.white : Colors.dark._1,
                }}
              >
                <View>
                <DoctorCard first_name= {appointment.doctor.first_name} second_name={appointment.doctor.last_name} specialization={appointment.doctor.specialization} hospital={appointment.doctor.hospital_name} image={{ uri: appointment.doctor.image }}/>
                </View>
                <View style={{ gap: 10 }}>
                  <Text
                    style={[
                      Typography.heading._5,
                      {
                        color:
                          theme === "dark"
                            ? Colors?.others?.white
                            : Colors?.grayScale?._900,
                      },
                    ]}
                  >
                    Scheduled appointment
                  </Text>
                  <Text
                    style={[
                      Typography.regular.large,{
                      color:
                        theme === "dark"
                          ? Colors?.others?.white
                          : Colors?.grayScale?._900,
                    }]}
                  >
                    {appointment.date}
                  </Text>
                  <Text
                    style={[
                      Typography.regular.large,{
                      color:
                        theme === "dark"
                          ? Colors?.others?.white
                          : Colors?.grayScale?._900,
                    }]}
                  >
                    {appointment.time}
                  </Text>
                </View>
                <View style={{ gap: 16 }}>
                  <Text
                    style={[
                      Typography.heading._5,
                      {
                        color:
                          theme === "dark"
                            ? Colors.others.white
                            : Colors.grayScale._900,
                      },
                    ]}
                  >
                    Patient Information
                  </Text>
                  <View style={{ gap: 10 }}>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 70,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={[
                        Typography.regular.large,
                        {
                          gap: 8,
                          color: theme === "dark" ? Colors.grayScale._300 : Colors.grayScale._900,
                        },
                      ]}
                    >
                      Full Name 
                    </Text>
                    <Text>: {appointment.user.first_name} {appointment.user.last_name}</Text>
                    </View>

                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 70,
                      borderRadius: 20,
                    }}>
                   <Text
                      style={[
                        Typography.regular.large,
                        { color: theme === "dark" ? Colors.grayScale._300 : Colors.grayScale._900 },
                      ]}
                    >
                      Gender {"   "}

                    </Text>
                    <Text>: {appointment.user.gender}</Text>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 70,
                      borderRadius: 20,
                    }}>
                       <Text
                      style={[
                        Typography.regular.large,
                        { color: theme === "dark" ?Colors.grayScale._300 : Colors.grayScale._900 },
                      ]}
                    >
                      Age {"          "}
                    </Text>
                    <Text>: {ages}</Text>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 70,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={[
                        Typography.regular.large,
                        {
                          color: theme === "dark" ? Colors.grayScale._300 : Colors.grayScale._900,
                          flexDirection: "row",
                          gap: 10,
                        },
                      ]}
                    >
                      Problem:{"  "}
                    
                    </Text>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap:10,
                      borderRadius: 20,
                      width: 200
                    }}>
                      <Text>:  {
                        showMore ? appointment.illness_descr : appointment.illness_descr.slice(0, 20)
                        }</Text>
                      {appointment.illness_descr.length > 20 && (
                        <Pressable 
                        style={{alignSelf: "flex-end"}}
                        onPress={() => setShowMore(!showMore)}>
                          <Text style={{ color: Colors.main.primary._500 }}>
                            {showMore ? "View Less" : "View More"}
                          </Text>
                        </Pressable>
                      )}
                    </View>
                    </View>
                  </View>
                </View>
                <View style={{ gap: 20 }}>
                  <Text
                    style={[
                      Typography.heading._5,
                      {
                        color:
                          theme === "dark"
                            ?Colors.grayScale._300
                            : Colors.grayScale._900,
                      },
                    ]}
                  >
                    Your Package
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 30,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.transparent.blue,
                          padding: 20,
                          borderRadius: 100,
                        }}
                      >
                        <SvgXml xml={BlueVoiceCall} />
                      </View>
                      <View style={{ gap: 5 }}>
                        <Text
                          style={[
                            Typography.heading._5,
                            {
                              color:
                                theme === "dark"
                                  ? Colors.grayScale._300
                                  : Colors.grayScale._900,
                            },
                          ]}
                        >
                          {appointment.package}
                        </Text>
                        <Text style={[
                        Typography.regular.large,
                        {
                          color: theme === "dark" ?Colors.grayScale._300 : Colors.grayScale._900,
                          flexDirection: "row",
                          gap: 10,
                        },
                      ]}>Voice Call with doctor</Text>
                      </View>
                    </View>
                    <View style={{ gap: 6 }}>
                      <Text
                        style={[
                          Typography.bold.xLarge,
                          { color: Colors.main.primary._500 },
                        ]}
                      >
                        {appointment.price}
                      </Text>
                      <Text style={[
                        Typography.regular.large,
                        {
                          color: theme === "dark" ? Colors.grayScale._300 : Colors.grayScale._900,
                          flexDirection: "row",
                          gap: 10,
                        },
                      ]}>{appointment.paid ? "(Paid)" : "(not paid)"}</Text>
                    </View>
                  </View>
                </View>

                <Pressable
                  onPress={() =>
                    router.push({
                       pathname:"(app)/Appointments/VoiceCallAppointment/VoiceCall",
                       params:{id:doctorID, AppointmentID:id}
                    }
                     
                    )
                  }
                  style={{
                    backgroundColor: Colors.main.primary._500,
                    borderRadius: 100,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      alignSelf: "center",
                      padding: 20,
                      gap: 20,
                    }}
                  >
                    <SvgXml xml={CallWhiteIcon} />
                    <Text
                      style={[
                        Typography.bold.large,
                        { color: Colors.others.white },
                      ]}
                    >
                      {appointment.package}(
                      <Text>Start at {appointment.time}</Text>)
                    </Text>
                  </View>
                </Pressable>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}

export default AppointmentVoiceCall;
