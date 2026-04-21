import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Typography from "@/constants/Typography";
import { router } from "expo-router";
import DoctorCard from "@/components/AppointmentDoctorsCards";
import SearchComponent from "@/components/SearchComponent";
import Appointmentnotfound from "@/components/Appointmentnotfound";
import Chips from "@/components/UI/ChipsComponent";
import { blueMessageIcon } from "@/components/UI/icons/blueMessage";
import { BlueVideoCall } from "@/components/UI/icons/videoCallIcon";
import { BlueVoiceCall } from "@/components/UI/icons/callIcon";
import { ThemeContext } from "@/ctx/ThemeContext";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import Historyheader from "@/components/Historyheader";
import { useModal } from "@/ctx/ModalContext";
import CancelAppointment from "@/components/cancelappointmentmodal";

interface Appointment {
  id: string;
  name: string;
  created_at: string;
  doctor_id: string;
  date: string;
  time: string;
  package: string;
  price: string;
  illness: string;
  status: string;
  user_id: string;
  doctor: {
    id: string;
    first_name: string;
    last_name: string;
    image: string;
  };
}

type TabKey = "Upcoming" | "Completed" | "Cancelled";

const AppointmentScreen: React.FC = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [headerWidth, setHeaderWidth] = useState<number>(0);
  const [showpopUp, setShowPopup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loggedUser, setLoggedUser] = useState<string | undefined>();
  const [profile, setProfile] = useState<any>(null);
  const [patientId, setPatientId] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<TabKey>("Upcoming");
  const [status, setStatus] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<string | undefined>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setLoggedUser(user?.id);
      }
    };
    fetchUser();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    const { data: appointmentsData, error: appointmentsError } =
      await supabase.from("appointment").select("*").eq("user_id", patientId);

    if (appointmentsError) {
      setRefreshing(false);
      console.error("Error fetching appointments:", appointmentsError);
      return;
    }

    const doctorIds = appointmentsData.map(
      (appointment) => appointment.doctor_id
    );

    const { data: doctorsData, error: doctorsError } = await supabase
      .from("doctors")
      .select("*")
      .in("id", doctorIds);

    if (doctorsError) {
      setRefreshing(false);
      console.error("Error fetching doctors:", doctorsError);
      return;
    }

    const mergedData = appointmentsData.map((appointment) => {
      const doctor = doctorsData.find(
        (doc) => doc.id === appointment.doctor_id
      );
      return { ...appointment, doctor };
    });

    setRefreshing(false);
    setAppointments(mergedData);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loggedUser) {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("auth_id", loggedUser)
          .single();
        if (error) {
          console.error("Error retrieving profile:", error);
        } else {
          setProfile(data);
          setPatientId(data.id);
        }
      }
    };
    fetchUserProfile();
  }, [loggedUser]);

  useEffect(() => {
    const updateHeaderWidth = () => {
      const screenWidth = Dimensions.get("window").width;
      const headerPadding = 20 * 2;
      const headerAvailableWidth = screenWidth - headerPadding;
      setHeaderWidth(headerAvailableWidth);
    };

    updateHeaderWidth();
  }, []);

  function handleIconOnPress(appointment: Appointment) {
    const route =
      appointment.package === "Messaging"
        ? "(app)/Appointments/MessagingAppointment"
        : appointment.package === "Video Call"
        ? "(app)/Appointments/VideoCallAppointment"
        : appointment.package === "Voice Call" 
        ? "(app)/Appointments/VoiceCallAppointment"
        : " "
    router.push({ pathname: route, params: { id: appointment.id } });
  }

  

  useEffect(() => {
    async function fetchData() {
      if (!patientId) return;

      setIsLoading(true);

      const { data: appointmentsData, error: appointmentsError } =
        await supabase.from("appointment").select("*").eq("user_id", patientId);

      if (appointmentsError) {
        setIsLoading(false);
        console.error("Error fetching appointments:", appointmentsError);
        return;
      }

      const doctorIds = appointmentsData.map(
        (appointment) => appointment.doctor_id
      );

      const { data: doctorsData, error: doctorsError } = await supabase
        .from("doctors")
        .select("*")
        .in("id", doctorIds);

      if (doctorsError) {
        setIsLoading(false);
        console.error("Error fetching doctors:", doctorsError);
        return;
      }

      const mergedData = appointmentsData.map((appointment) => {
        const doctor = doctorsData.find(
          (doc) => doc.id === appointment.doctor_id
        );
        return { ...appointment, doctor };
      });

      setIsLoading(false);
      setAppointments(mergedData);

      const statuses = ["Upcoming", "Completed", "Cancelled"];
      setStatus(statuses);
    }
    fetchData();
  }, [patientId]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status as TabKey);
    setSearchTerm("");
  };

  const handleSearchPressed = () => {
    setShowSearch(true);
  };

  const handleSearchSubmit = (text: string) => {
    setSearchTerm(text.toLowerCase());
  };

  const handleFilter = () => {
    setShowFilter(true);
  };
  const fetchDoctorName = async (doctorId: string) => {
    const { data, error } = await supabase
      .from('doctors')
      .select('first_name')
      .eq('id', doctorId)
      .single();

    if (error) {
      console.log("Error fetching doctor's name: ", error);
      return "";
    }

    return data.first_name;
  };
  const addNotification = async ( doctorName: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          title: 'Appointment Cancelled',
          description: `You have successfully cancelled your booked appointment with Dr. ${doctorName}`,
          patient_id: patientId,
          type: "appointment_changed",
          viewed:false
         
        });

      if (error) {
        console.log("Error while inserting notification ", error);
      }
    } catch (error) {
      console.log("Error while inserting notification ", error);
    }
  };


  const handleCancel =async (id:string,doctor_id:string) => {
    setAppointmentId(id);
    if (typeof doctor_id === "string") {
        const doctorName = await fetchDoctorName(doctor_id);
        await addNotification(doctorName);
      }
    
    setShowPopup(true);
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchSearchTerm =
      searchTerm.length > 0
        ? appointment.doctor.last_name.toLowerCase().includes(searchTerm) ||
          appointment.doctor.first_name.toLowerCase().includes(searchTerm)
        : true;
    const matchStatus =
      selectedStatus === "Upcoming"
        ? appointment.status === "Upcoming"
        : appointment.status === selectedStatus;
    return matchSearchTerm && matchStatus;
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark" ? Colors.dark._1 : Colors.others.white,
        },
      ]}
    >
      <ImageBackground
        style={[
          styles.header,
          {
            backgroundColor:
              theme === "dark" ? Colors.dark._1 : Colors.others.white,
          },
        ]}
      >
        <View style={styles.heading}>
          {!showSearch ? (
            <Historyheader
              onSearchPressed={handleSearchPressed}
              headerText="My appointments"
            />
          ) : (
            <SearchComponent
              onSearchSubmit={handleSearchSubmit}
              filterAction={handleFilter}
            />
          )}
        </View>
        <View style={styles.headerNav}>
          {status.map((status, index) => (
            <Pressable
              key={index}
              onPress={() => handleStatusChange(status)}
              style={[
                styles.tab,
                selectedStatus === status ? styles.activeTab : {},
              ]}
            >
              <Text
                style={[
                  Typography.semiBold.xLarge,
                  theme === "dark" ? { color: Colors.others.white } : styles.tabText,
                  selectedStatus === status ? styles.activeTabText : {},
                ]}
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>
      </ImageBackground>

      <ScrollView 
         refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />}
      style={styles.cardContainer}>
        {isLoading ? (
          <ActivityIndicator
            color={Colors.main.primary._500}
            size="large"
            style={{ marginLeft: "10%" }}
          />
        ) : (
          <>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <DoctorCard
                  key={index}
                  name={`${appointment.doctor.last_name} ${appointment.doctor.first_name}`}
                  date={appointment.date}
                  time={appointment.time}
                  image={{ uri: appointment.doctor.image }}
                  status={appointment.status}
                  statusColor={
                    appointment.status === "Upcoming"
                      ? Colors.main.primary._500
                      : appointment.status === "Completed"
                      ? Colors.others.green
                      : Colors.others.pink
                  }
                  type={appointment.package}
                  icon={
                    appointment.package === "Messaging" && appointment.status === "Upcoming" ? (
                      <SvgXml xml={blueMessageIcon} />
                    ) : appointment.package === "Video Call" && appointment.status === "Upcoming"? (
                      <SvgXml xml={BlueVideoCall} />
                    ) : appointment.package === "Voice Call" && appointment.status === "Upcoming" ?(
                      <SvgXml xml={BlueVoiceCall} />
                    ) : null
                  }
                  iconOnPress={() => handleIconOnPress(appointment)}
                  buttons={
                    appointment.status === "Upcoming" ? (
                      <>
                        <Chips
                          text="Cancel Appointment"
                          size="small"
                          type="border"
                          onPress={()=> handleCancel(appointment.id,appointment.doctor_id)}
                        />
                        <Chips
                          text="Reschedule"
                          size="small"
                          style={{ paddingLeft: 40, paddingRight: 40 }}
                          type="filled"
                          onPress={() =>
                            router.push(
                              "Appointments/ReschedualAppointment/Selectreason"
                            )
                          }
                        />
                      </>
                    ) : appointment.status === "Completed" ? (
                      <><Chips text="Book Again" size="small" type="border" style={{paddingLeft:50,paddingRight:50}} onPress={() => router.push({ pathname: "/ActionMenu/Booking/Doctor_details",params:{id:appointment.doctor.id} })} /><Chips text="Leave a Review" size="small"  type="filled"style={{paddingLeft:30,paddingRight:30}} onPress={() => router.push({ pathname: "Appointments/Review/ReviewBlankform",params:{id:appointment.doctor.id} })} /></>
                    ) : (
                      <></>
                    )
                  }
                />
              ))
            ) : (
              <Appointmentnotfound />
            )}
          </>
        )}
      </ScrollView>
      <CancelAppointment
        visible={showpopUp}
        cancel={()=> setShowPopup(false)}
        appointmentId={appointmentId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderBottomColor: Colors.grayScale._500,
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    color: Colors.main.primary._500,
    borderBottomColor: Colors.main.primary._500,
    borderBottomWidth: 4,
  },
  tabText: {
    color: Colors.grayScale._900,
  },
  activeTabText: {
    color: Colors.main.primary._500,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default AppointmentScreen;
